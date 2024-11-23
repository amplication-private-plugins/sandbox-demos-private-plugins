import {
  blueprintPluginEventsParams as blueprint,
  blueprintPluginEventsTypes,
  blueprintTypes,
  FileMap,
  IFile,
} from "@amplication/code-gen-types";
import { CodeBlock } from "@amplication/csharp-ast";
import { snakeCase } from "lodash";
import { resolve } from "path";
import {
  DEFAULT_DOTNET_PORT,
  SERVICE_NAME_KEY,
  SERVICE_PORT_KEY,
} from "./constants";

class BlueprintPluginTemplatePlugin
  implements blueprintTypes.AmplicationPlugin
{
  register(): blueprintPluginEventsTypes.BlueprintEvents {
    return {
      createBlueprint: {
        after: this.afterLoadStaticFiles,
      },
    };
  }
  async afterLoadStaticFiles(
    context: blueprintTypes.DsgContext,
    eventParams: blueprint.CreateBlueprintParams,
    files: FileMap<CodeBlock>
  ): Promise<FileMap<CodeBlock>> {
    context.logger.info("Generating Static Files ...");

    // determine the name of the service which will be used as the name for the workflow
    // workflow names must be lower case letters and numbers. words may be separated with dashes (-):
    const pluginName = snakeCase(context.resourceInfo?.name);

    //@ts-ignore
    const params = eventParams as blueprint.CreateBlueprintParams;

    // set the path to the static files and fetch them for manipulation
    const staticPath = resolve(__dirname, "./static");
    const staticFiles = await context.utils.importStaticFiles(staticPath, "./");

    for (const item of staticFiles.getAll()) {
      const newCode = item.code
        .replaceAll(SERVICE_NAME_KEY, pluginName)
        .replaceAll(SERVICE_PORT_KEY, DEFAULT_DOTNET_PORT);

      const newPath = item.path.replaceAll(SERVICE_NAME_KEY, pluginName);

      const file: IFile<CodeBlock> = {
        path: newPath,
        code: new CodeBlock({
          code: newCode,
        }),
      };
      files.set(file);
    }
    return files;
  }
}

export default BlueprintPluginTemplatePlugin;
