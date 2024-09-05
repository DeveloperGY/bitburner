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
        const server_available = player_hacking_level >= req_hack_level && req_open_nodes <= port_crack_count(ns);

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

/** @param {NS} ns  */
function port_crack_count(ns) {
    let count = 0;

    if (ns.fileExists("BruteSSH.exe", "home")) {
        count += 1;
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        count += 1;
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        count += 1;
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        count += 1;
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        count += 1;
    }

    return count;
}