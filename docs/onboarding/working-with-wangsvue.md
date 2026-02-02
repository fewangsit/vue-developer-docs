---
icon: vuejs
---

# Working with WangsVue

WangsVue is our Design System Component Library for Vue.js. It is built with Vue.js 3 and Tailwind CSS.

In this article, we will guide you to setup and use WangsVue MCP with AI Agents. We will focusing on GitHub Copilot. Other IDEs may have different configuration methods. Please refer to their documentation for more details.

## Prepare WangsVue MCP

WangsVue includes an MCP server that enables AI models to access comprehensive context about the library’s components and their usage.

Every WangsVue package includes the MCP server, which you can start using the `wangsvue-mcp` CLI tool.

### CLI Commands

The `wangsvue-mcp` CLI tool provides additional utility commands:

- `run`: Starts the MCP server (STDIO).
- `init-rules <editor>`: Initializes documentation and rules for a specific AI editor.
  - Supported editors: `kiro`, `windsurf`, `trae`, `copilot`.
  - Options:
    - `--api-services`: Only initialize rules for API documentation.
    - `--split`: Split content into separate MD files. By default, it merged with a single `Master Operating Directive.md`.

Run `npx wangsvue-mcp init-rules copilot` to initialize the rules for Copilot. It will create a `copilot.instruction.md` file within folder `.github/instructions`.

### MCP Server Configuration

To use the MCP server with your AI editor, you need to configure it in your editor settings.

Bellow is an example configuration for Visual Studio Code in `.vscode/mcp.json`:

```json
{
  "servers": {
    "wangsvue-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["wangsvue-mcp", "run"]
    },
    "wangsvue-docs": {
      "url": "https://wangsvue.netlify.app/mcp"
    },
    "figma-dev": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  },
  "inputs": []
}
```

Other editors may have different configuration methods. Please refer to their documentation for more details.

For `figma-dev` mcp, you need to opens Figma Desktop and enable the MCP server:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cq-7lFMNESk?si=RRaA5olZril7gzzy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Then you need to starts the MCP server manually, since as this article written, the MCP server is not started automatically and the settings for automatic start is still experimental feature and currently not working properly.

To start the MCP server, opens `.vscode/mcp.json` and click the `start` button appears on each server.

![Manually Start MCP Server](../.gitbook/assets/mcp-server-start-manually.png)

## Using the MCP Server with AI Editors

Once you have configured the MCP server in your editor, you can start using it with AI models. The server will provide the necessary context to generate accurate and helpful code suggestions.

### Verify MCP Server is Running

In VS Code, opens `.vscode/mcp.json`. You will see the MCP Server status and the tools count available.

![MCP Server Running](../.gitbook/assets/mcp-server-running.png)

Now these mcp tools are available for AI Agent within GitHub Copilot Extension.

### Configure Tools in Copilot Chat extension

Opens Copilot Chat extension panel, change mode to Agent mode. Then click the `Configure Tools` button.

![Configure Tools](../.gitbook/assets/copilot-chat-configure-tools-button.png)

Then configure to match bellow image:

![Configure Tools](../.gitbook/assets/copilot-chat-configured-tools.png)

Click OK.
