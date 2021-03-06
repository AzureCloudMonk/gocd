/*
 * Copyright 2018 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Routes from "gen/ts-routes";
import {ApiRequestBuilder, ApiVersion} from "helpers/api_request_builder";
import {ExtensionType} from "models/shared/plugin_infos_new/extension_type";
import {PluginInfo} from "models/shared/plugin_infos_new/plugin_info";

export interface PluginInfoQuery {
  include_bad?: boolean;
  type?: ExtensionType | undefined;
}

export class PluginInfoCRUD {
  private static API_VERSION_HEADER = ApiVersion.v4;

  static all(options: PluginInfoQuery) {
    return ApiRequestBuilder.GET(Routes.apiv4AdminPluginInfoIndexPath(options), this.API_VERSION_HEADER)
      .then((xhr: XMLHttpRequest) => {
        const data = JSON.parse(xhr.responseText);
        return data._embedded.plugin_info.map((pluginInfo: any) => PluginInfo.fromJSON(pluginInfo, data._links));
      });
  }

}
