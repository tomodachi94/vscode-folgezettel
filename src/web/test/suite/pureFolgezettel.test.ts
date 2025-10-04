import assert from "assert";
import {
  incId,
  nextTrainIdFromFilenames,
  parentFromCurrent,
  MarkdownFilename,
  newTheoreticalParsedId,
} from "../../pureFolgezettel";

describe("incId", () => {
  it("increments numeric sibling", () => {
    assert.deepEqual(
      incId(newTheoreticalParsedId("2.1")),
      newTheoreticalParsedId("2.2"),
    );
    assert.deepEqual(
      incId(newTheoreticalParsedId("2.9")),
      newTheoreticalParsedId("2.10"),
    );
  });

  it("increments alpha sibling", () => {
    assert.deepEqual(
      incId(newTheoreticalParsedId("2.1a")),
      newTheoreticalParsedId("2.1b"),
    );
    assert.deepEqual(
      incId(newTheoreticalParsedId("2.1z")),
      newTheoreticalParsedId("2.1aa"),
    );
  });

  it("appends 1 if no dot", () => {
    assert.deepStrictEqual(
      incId(newTheoreticalParsedId("foo")),
      newTheoreticalParsedId("foo"),
    );
  });
});

describe("nextTrainIdFromFilenames", () => {
  it("returns 1 when no files", () => {
    assert.strictEqual(nextTrainIdFromFilenames([]), 1);
  });

  it("returns max+1 for existing numeric trains", () => {
    const files: MarkdownFilename[] = ["1.1.md", "2.1.md", "10.1.md"];
    assert.strictEqual(nextTrainIdFromFilenames(files), 11);
  });

  it("ignores non-matching files and titles after number", () => {
    const files: MarkdownFilename[] = ["1.1.md", "foo.md", "3.1 some title.md"];
    assert.strictEqual(nextTrainIdFromFilenames(files), 4);
  });
});

describe("parentFilenameFromCurrent", () => {
  it("strips trailing groups to go to numeric parent", () => {
    assert.deepStrictEqual(
      parentFromCurrent(newTheoreticalParsedId("2.1aa")),
      newTheoreticalParsedId("2.1"),
    );
    assert.deepStrictEqual(
      parentFromCurrent(newTheoreticalParsedId("2.1")),
      newTheoreticalParsedId("2.1"),
    );
    assert.deepStrictEqual(
      parentFromCurrent(newTheoreticalParsedId("2.1aa1")),
      newTheoreticalParsedId("2.1a"),
    );
    assert.deepStrictEqual(
      parentFromCurrent(newTheoreticalParsedId("2.1a4b1")),
      newTheoreticalParsedId("2.1a4b"),
    );
  });

  it("returns same basename when no dot present", () => {
    assert.deepStrictEqual(
      parentFromCurrent(newTheoreticalParsedId("foo")),
      newTheoreticalParsedId("foo"),
    );
  });
});
