import * as assert from "assert";
import * as vscode from "vscode";
import { touch } from "../../utils";

describe("New Sibling integration", () => {
  it("creates a new sibling thought next to current file", async function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sandboxUri = (this as any).sandboxUri as vscode.Uri;

    const fileUri = await touch("2.1a.md", sandboxUri);
    const doc = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand(
      "vscode-folgezettel.newSiblingThought",
    );

    const activeFile = vscode.window.activeTextEditor?.document.uri.path
      .split("/")
      .pop();
    assert.strictEqual(activeFile, "2.1b.md");
  });

  it("creates a new sibling when the current note is titled", async function () {
    const fileUri = await touch("64.1a hello world.md");
    const doc = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand(
      "vscode-folgezettel.newSiblingThought",
    );

    const activeFile = vscode.window.activeTextEditor?.document.uri.path
      .split("/")
      .pop();
    assert.strictEqual(activeFile, "64.1b.md");
  });
});
