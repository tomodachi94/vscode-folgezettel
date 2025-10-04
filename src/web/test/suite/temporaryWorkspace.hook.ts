import * as vscode from "vscode";

function sanitizeName(name: string): string {
  // Replace spaces, slashes, special chars with underscores (or something safe)
  return name.replace(/\s+/g, "_").replace(/[<>:"/\\|?*]/g, "_");
}

export const mochaHooks = {
  beforeEach: async function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const test = (this as any).currentTest!;
    const safe = sanitizeName(test.fullTitle());

    const root = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!root) throw new Error("No workspace folder available");

    const sandboxUri = vscode.Uri.joinPath(root, safe);

    try {
      await vscode.workspace.fs.delete(sandboxUri, { recursive: true });
    } catch (e) {
      console.log(e);
    }

    await vscode.workspace.fs.createDirectory(sandboxUri);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).sandboxUri = sandboxUri;
  },

  afterEach: async function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const test = (this as any).currentTest!;
    const safe = sanitizeName(test.fullTitle());

    const root = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!root) return;

    const sandboxUri = vscode.Uri.joinPath(root, safe);
    try {
      await vscode.workspace.fs.delete(sandboxUri, { recursive: true });
    } catch (e) {
      console.log(e);
    }
  },
};
