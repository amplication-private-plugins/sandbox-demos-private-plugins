import { blueprintPluginEventsParams as blueprint, blueprintPluginEventsTypes, blueprintTypes, FileMap } from "@amplication/code-gen-types";
import { CodeBlock } from "@amplication/csharp-ast";
declare class pluginTest1 implements blueprintTypes.AmplicationPlugin {
    register(): blueprintPluginEventsTypes.BlueprintEvents;
    afterLoadStaticFiles(context: blueprintTypes.DsgContext, eventParams: blueprint.CreateBlueprintParams, files: FileMap<CodeBlock>): Promise<FileMap<CodeBlock>>;
}
export default pluginTest1;
