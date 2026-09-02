import assert from "node:assert/strict";
import { BLESSING_PACKS, CLASSIC_PICTURES, createClassicPack, requiredBundles } from "../assets/scripts/config/GameConfig";
import { JigsawCore } from "../assets/scripts/core/JigsawCore";

assert.equal(BLESSING_PACKS.length, 4);
assert.deepEqual(BLESSING_PACKS.map((pack) => pack.imageKeys.length), [4, 8, 6, 8]);
assert.equal(CLASSIC_PICTURES.length, 60);
assert.deepEqual(requiredBundles(BLESSING_PACKS[2]), ["blessing"]);
assert.equal(createClassicPack(1).grid, 4);
assert.equal(createClassicPack(15).grid, 5);
assert.equal(createClassicPack(15).imageKeys.length, 9);
assert.ok(new Set(createClassicPack(30).imageKeys).size === createClassicPack(30).imageKeys.length);

const deterministicA = new JigsawCore();
const deterministicB = new JigsawCore();
const keys = ["a", "b", "c", "d", "e", "f", "g", "h"];
deterministicA.reset(keys, 5, 12345, { maxDealPerColumn: 1, chainDepth: 3 });
deterministicB.reset(keys, 5, 12345, { maxDealPerColumn: 1, chainDepth: 3 });
assert.deepEqual(deterministicA.board, deterministicB.board);
assert.deepEqual(deterministicA.decks, deterministicB.decks);
assert.equal(deterministicA.remainingCount(), 32);
assert.equal(deterministicA.decks.flat().length, 7);
deterministicA.assertIntegrity();

const snapshot = deterministicA.makeSnapshot();
const move = deterministicA.findHelpfulMove();
assert.ok(move, "generated board should expose a positive move");
const applied = deterministicA.applyMove(move.group, move.dr, move.dc);
assert.equal(applied.valid, true);
assert.notDeepEqual(deterministicA.board, snapshot.board);
deterministicA.restoreSnapshot(snapshot);
assert.deepEqual(deterministicA.board, snapshot.board);
assert.deepEqual(deterministicA.decks, snapshot.decks);

const gravity = new JigsawCore();
gravity.reset(["r", "s", "t", "u"], 4, 8, false);
const r = gravity.idsForImage("r");
gravity.board = Array(16).fill(null);
gravity.decks = Array.from({ length: 4 }, () => []);
const otherIds = [...gravity.tiles.keys()].filter((id) => !r.includes(id));
// Keep integrity while testing a horizontal joined pair moving as one body.
gravity.board[4] = r[0];
gravity.board[5] = r[1];
let cursor = 0;
for (let cell = 0; cell < gravity.board.length; cell += 1) {
    if (!gravity.board[cell] && cursor < otherIds.length) gravity.board[cell] = otherIds[cursor++];
}
while (cursor < otherIds.length) gravity.decks[cursor % 4].push(otherIds[cursor++]);
// Clear supporting cells and move displaced values back into the decks.
for (const cell of [8, 9]) {
    const id = gravity.board[cell];
    gravity.board[cell] = null;
    if (id) gravity.decks[cell % 4].push(id);
}
const rigid = gravity.gravityStep();
assert.equal(rigid.moved, true);
assert.equal(gravity.board[8], r[0]);
assert.equal(gravity.board[9], r[1]);

const deadlock = new JigsawCore();
const deadKeys = Array.from({ length: 9 }, (_, index) => `dead-${index}`);
deadlock.reset(deadKeys, 5, 44, false);
const chosen: string[] = [];
const hidden: string[] = [];
for (let image = 0; image < deadKeys.length; image += 1) {
    const ids = deadlock.idsForImage(deadKeys[image]);
    const limit = image < 8 ? 3 : 1;
    chosen.push(...ids.slice(0, limit));
    hidden.push(...ids.slice(limit));
}
assert.equal(chosen.length, 25);
deadlock.board = chosen.slice();
deadlock.decks = Array.from({ length: 5 }, () => []);
hidden.forEach((id, index) => deadlock.decks[index % 5].push(id));
deadlock.assertIntegrity();
const frozenBoard = deadlock.board.slice();
const frozenDecks = deadlock.decks.map((deck) => deck.slice());
assert.equal(deadlock.visibleCompletionImage(), null);
assert.equal(deadlock.isDeadlocked(), true);
assert.deepEqual(deadlock.board, frozenBoard, "deadlock detection must not silently change the board");
assert.deepEqual(deadlock.decks, frozenDecks, "deadlock detection must not silently reorder the deck");
const rescue = deadlock.rescue();
assert.equal(rescue.changed, true);
deadlock.assertIntegrity();
assert.ok(deadlock.visibleCompletionImage(), "explicit rescue must expose one full family");
assert.ok(deadlock.findHelpfulMove(), "explicit rescue should create a legal progress move");

for (let level = 1; level <= 60; level += 1) {
    const pack = createClassicPack(level);
    const core = new JigsawCore();
    core.reset(pack.imageKeys, pack.grid, pack.seed, {
        fastStart: pack.fastStart,
        maxDealPerColumn: pack.maxDealPerColumn,
    });
    core.assertIntegrity();
    assert.ok(core.visibleCompletionImage(), `classic level ${level} must expose at least one complete family`);
}

console.log("PASS full core: content packs, deterministic generation, snapshot, rigid gravity, explicit rescue and 60 classic levels");
