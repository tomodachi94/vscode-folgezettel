import * as assert from "assert";
import * as vscode from "vscode";

describe("Extension", () => {
  vscode.window.showInformationMessage("Start all tests.");

  it("should activate the extension", async () => {
    const ext = vscode.extensions.getExtension(
      "tomodachi94.vscode-folgezettel",
    );
    assert.ok(ext, "Extension not found");
    await ext!.activate();
    assert.ok(ext!.isActive, "Extension did not activate");
  });
});
