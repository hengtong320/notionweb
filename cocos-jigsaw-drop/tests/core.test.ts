import assert from "node:assert/strict";
import { JigsawCore } from "../assets/scripts/core/JigsawCore";

const easy = new JigsawCore();
easy.reset(["a", "b", "c", "d"], 4, 7, true);
assert.equal(easy.board.length, 16);
assert.equal(easy.remainingCount(), 16);
const hint = easy.findHelpfulMove();
assert.ok(hint, "fast-start board should expose a positive move");
easy.board = hint.board;
let gravityGuard = 0;
while (easy.gravityStep().moved && gravityGuard++ < 20) { /* settle */ }
const complete = easy.completeGroups();
assert.ok(complete.length >= 1, "hint move should complete at least one image");
const cleared = easy.clearGroups(complete);
assert.ok(cleared.length >= 1);

const hard = new JigsawCore();
hard.reset(["h1", "h2", "h3", "h4", "h5", "h6"], 5, 11, false);
assert.equal(hard.board.length, 25);
assert.equal(hard.remainingCount(), 24);
assert.equal(hard.decks.flat().length, 0);

const ids = hard.idsForImage("h1");
hard.board = Array(25).fill(null);
hard.board[5] = ids[0];
hard.board[6] = ids[1];
const rigid = hard.gravityStep();
assert.equal(rigid.moved, true);
assert.equal(hard.board[10], ids[0]);
assert.equal(hard.board[11], ids[1]);

const swap = new JigsawCore();
swap.reset(["x", "y", "z", "w"], 4, 3, false);
const tileId = swap.board[0]!;
const group = swap.groupForTile(tileId, true)!;
const result = swap.validateMove(group, 3, 3);
assert.equal(result.valid, true);
assert.equal(result.board[15], tileId);

console.log("PASS JigsawCore: generation, move, completion, clear, rigid gravity and long-distance swap");
