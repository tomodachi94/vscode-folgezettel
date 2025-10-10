import * as assert from "assert";
import * as vscode from "vscode";
import { touch } from "../../utils";
import { MarkdownFilename, newParsedIdFromPath } from "../../pureFolgezettel";

describe("Go To Parent integration", () => {
  it("navigates to parent for 2.1aa -> 2.1", async function () {
    await touch("2.1.md");
    const uri = await touch("2.1aa.md");
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand(
      "vscode-folgezettel.goToParentThought",
    );
    const active = vscode.window
      .activeTextEditor!.document.fileName.split("/")
      .pop();
    assert.strictEqual(active, "2.1.md");
  });

  it("no-op for top-level 2.1", async function () {
    const uri = await touch("2.1.md");
    const doc = await vscode.workspace.openTextDocument(uri);
    vscode.window.showTextDocument(doc);
    await vscode.commands.executeCommand(
      "vscode-folgezettel.goToParentThought",
    );
    const active = vscode.window
      .activeTextEditor!.document.fileName.split("/")
      .pop();
    assert.strictEqual(active, "2.1.md");
  });

  it("navigate to parent where notes are titled", async function () {
    const parent = newParsedIdFromPath(
      (await touch("32.1 hello world.md")).path as MarkdownFilename,
    ).basename;
    const childUri = await touch("32.1a world says hello back.md");
    const doc = await vscode.workspace.openTextDocument(childUri);
    await vscode.window.showTextDocument(doc);
    await vscode.commands.executeCommand(
      "vscode-folgezettel.goToParentThought",
    );
    const active = newParsedIdFromPath(
      vscode.window.activeTextEditor!.document.uri.path as MarkdownFilename,
    );
    assert.strictEqual(active.id, newParsedIdFromPath(parent).id);
  });
});
