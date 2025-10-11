import * as assert from "assert";
import * as vscode from "vscode";
import { MarkdownFilename, newParsedIdFromPath } from "../../pureFolgezettel";
import { touch } from "../../utils";

describe("New Child integration", () => {
  it("creates alpha child for dotted id (2.1 -> 2.1a)", async () => {
    const fileUri = await touch("2.1.md");

    const doc = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand("vscode-folgezettel.newChildThought");

    const active = newParsedIdFromPath(
      vscode.window.activeTextEditor!.document.fileName as MarkdownFilename,
    );
    assert.strictEqual(active.basename, "2.1a.md");
  });

  it("creates a child where the parent is titled (53.1 hello -> 53.1a)", async () => {
    const fileUri = await touch("53.1 hello.md");

    const doc = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand("vscode-folgezettel.newChildThought");

    const active = newParsedIdFromPath(
      vscode.window.activeTextEditor!.document.fileName as MarkdownFilename,
    );
    assert.strictEqual(active.basename, "53.1a.md");
  });

  it("creates numeric child for id without dot by appending number (foo -> foo1)", async () => {
    const fileUri = await touch("foo.md");

    const doc = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand("vscode-folgezettel.newChildThought");

    const active = vscode.window
      .activeTextEditor!.document.fileName.split("/")
      .pop();
    assert.strictEqual(active, "foo1.md");
  });

  it("skips existing children and picks next candidate", async () => {
    const parentUri = await touch("3.1.md");
    await touch("3.1a.md");

    const doc = await vscode.workspace.openTextDocument(parentUri);
    await vscode.window.showTextDocument(doc);

    await vscode.commands.executeCommand("vscode-folgezettel.newChildThought");

    const active = vscode.window
      .activeTextEditor!.document.fileName.split("/")
      .pop();
    assert.strictEqual(active, "3.1b.md");
  });
});
