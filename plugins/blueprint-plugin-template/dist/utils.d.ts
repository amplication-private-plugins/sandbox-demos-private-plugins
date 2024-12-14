import { PluginInstallation } from "@amplication/code-gen-types";
import { Settings } from "./types";
export declare const getPluginSettings: (pluginInstallations: PluginInstallation[]) => Settings;
export declare function replacePlaceholders(template: string, replacements: Record<string, string>): string;