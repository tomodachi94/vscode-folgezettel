import * as vscode from "vscode";
import * as folgezettel from "./pureFolgezettel";

/**
 * Creates an empty file in the current workspace folder.
 * Equivalent to the Unix `touch` command.
 *
 * @param filename - The name of the file to create (e.g., "note.md").
 * @returns The URI of the created file.
 */
export const touch = async (
  filename: folgezettel.MarkdownFilename,
  folderUri?: vscode.Uri,
): Promise<vscode.Uri> => {
  const folder = folderUri ?? vscode.workspace.workspaceFolders?.[0]?.uri;
  if (!folder) {
    throw new Error("No workspace folder is open.");
  }

  const uri = vscode.Uri.joinPath(folder, filename);
  await vscode.workspace.fs.writeFile(uri, new Uint8Array());
  return uri;
};
