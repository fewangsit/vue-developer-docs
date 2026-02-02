---
icon: vuejs
---

# Working with WangsVue

WangsVue is our Design System Component Library for Vue.js 3, powered by Tailwind CSS. To get the most out of WangsVue when developing with AI, we use the **Model Context Protocol (MCP)**.

This guide will walk you through setting up the WangsVue MCP server to provide AI agents (specifically **GitHub Copilot**) with full context about our components, APIs, and design patterns.

***

## Step 1: Initialize AI Rules

The first step is to provide your editor with the "Master Operating Directive" for WangsVue. This helps the AI understand our coding standards and library structure.

Run the following command in your terminal:

```bash
npx wangsvue-mcp init-rules copilot
```

**What this does:**

* Creates a `.github/instructions/Master Operating Directive.instruction.md` file.
* This file contains the essential context GitHub Copilot needs to write high-quality WangsVue code.

{% hint style="info" %}
Other supported editors include `kiro`, `windsurf`, and `trae`. Simply replace `copilot` with your editor's name in the command.
{% endhint %}

***

## Step 2: Configure MCP Servers

To enable real-time documentation and utility access, you need to configure the MCP servers in VS Code.

1. Create or open `.vscode/mcp.json` in your project root.
2. Add the following configuration:

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
  }
}
```

***

## Step 3: Enable Figma Integration (Optional)

If you want the AI to have access to your Figma designs, you need to enable the Figma MCP server locally.

1. Open **Figma Desktop**.
2. Enable the MCP server within Figma (see video below).
3. Ensure the server is running on `http://127.0.0.1:3845`.

{% embed url="https://www.youtube.com/embed/Cq-7lFMNESk?si=RRaA5olZril7gzzy" %}

***

## Step 4: Start and Verify the Servers

In the current version of the VS Code MCP extension, servers may need to be started manually.

1. Open `.vscode/mcp.json` in VS Code.
2. Look for the **"start"** button that appears above or next to each server definition.
3. Click **start** for all configured servers.

![Manually Start MCP Server](../.gitbook/assets/mcp-server-start-manually.png)

### Verify Connection

Once started, you should see a 'Running' status and a count of available tools. This confirms that the AI now has access to the WangsVue ecosystem.

![MCP Server Running](../.gitbook/assets/mcp-server-running.png)

***

## Step 5: Enable Tools in GitHub Copilot

Finally, you must tell GitHub Copilot to use these tools during your chat sessions.

1. Open the **Copilot Chat** panel.
2. Switch the mode to **Agent** mode.
3. Click the **Configure Tools** button.\
   ![Configure Tools Button](../.gitbook/assets/copilot-chat-configure-tools-button.png)
4. Enable the tools provided by `wangsvue-mcp` and `wangsvue-docs` as shown below: ![Configured Tools Selection](../.gitbook/assets/copilot-chat-configured-tools.png)
5. Click **OK**.

You're all set! You can now ask Copilot to "Create a WangsVue table with these specs..." and it will use the MCP tools to fetch the latest documentation and examples.
