/** @param {NS} ns */
export async function main(ns) {
    const player_hacking_level = ns.getHackingLevel();

    const nearby_servers = ns.scan().filter((hostname) => {
        if (hostname == "home") {
            return false;
        }

        const req_hack_level = ns.getServerRequiredHackingLevel(hostname);
        const req_open_nodes = ns.getServerNumPortsRequired(hostname);

        // Ensure we have the levels required to hack the server
        const server_available = player_hacking_level >= req_hack_level && req_open_nodes <= 1;

        if (server_available) {
            ns.tprint(`${hostname} is a feesible target!`);
        }
        else {
            ns.tprint(`${hostname} is an invalid target!`);
        }

        return server_available;
    });

    for (let i = 0; i < nearby_servers.length; i++) {
        ns.tprint(`Starting Hack On ${nearby_servers[i]}`);
        ns.run("base_hack.js", 1, nearby_servers[i]);
    }
}