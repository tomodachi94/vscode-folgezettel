import * as assert from "assert";
import * as vscode from "vscode";
import { touch } from "../../utils";

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
    await vscode.workspace.openTextDocument(uri);
    await vscode.commands.executeCommand(
      "vscode-folgezettel.goToParentThought",
    );
    const active = vscode.window
      .activeTextEditor!.document.fileName.split("/")
      .pop();
    assert.strictEqual(active, "2.1.md");
  });
});
