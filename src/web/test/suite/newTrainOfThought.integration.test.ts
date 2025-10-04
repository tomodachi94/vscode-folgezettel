import * as assert from "assert";
import * as vscode from "vscode";
import {
  nextTrainIdFromFilenames,
  MarkdownFilename,
} from "../../pureFolgezettel";
import { touch } from "../../utils";

describe("New Train integration", () => {
  it("creates a new train of thought file (next numeric id)", async function () {
    this.timeout(10000);

    await touch("1.1.md");
    const uri2 = await touch("2.1.md");

    const doc = await vscode.workspace.openTextDocument(uri2);
    await vscode.window.showTextDocument(doc);

    const files = await vscode.workspace.findFiles("*.md");
    const filenames = files.map(
      (f) => f.path.split("/").pop()!,
    ) as MarkdownFilename[];
    const expectedId = nextTrainIdFromFilenames(filenames);
    const expectedFilename = `${expectedId}.1.md`;

    await vscode.commands.executeCommand(
      "vscode-folgezettel.newTrainOfThought",
    );
    const active = vscode.window
      .activeTextEditor!.document.fileName.split("/")
      .pop();
    assert.strictEqual(active, expectedFilename);
  });
});
