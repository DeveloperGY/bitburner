/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length != 1) {
        ns.print("==> No target specified!");
        return;
    }

    disable_log(ns);

    const target = ns.args[0]
    if (!ns.serverExists(target)) {
        ns.print(`==> ${target} is not a valid server`);
        return;
    }

    const has_root = ns.hasRootAccess(target);
    const required_ports = ns.getServerNumPortsRequired(target);
    const has_required_ports = required_ports <= 1;
    const has_required_hacking_level = ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target);

    ns.print(`==> Validating ${target}...`)
    if (!has_required_hacking_level) {
        ns.print(`  -> Hacking Level Too Low`);
        return;
    }
    else {
        ns.print(`  -> ${target} Validated`);
    }

    if (!has_root) {
        ns.print(`==> Gaining Root Access to ${target}...`);

        if (has_required_ports) {
            if (required_ports > 0) {
                if (ns.fileExists("BruteSSH.exe", "home")) {
                    ns.print("  -> Opening SSH Port...");
                    ns.brutessh(target);
                }
                if (ns.fileExists("FTPCrack.exe", "home")) {
                    ns.print("  -> Opening FTP Port...");
                    ns.ftpcrack(target);
                }
                if (ns.fileExists("relaySMTP.exe", "home")) {
                    ns.print("  -> Opening SMTP Port...");
                    ns.relaysmtp(target);
                }
                if (ns.fileExists("HTTPWorm.exe", "home")) {
                    ns.print("  -> Opening HTTP Port...");
                    ns.httpworm(target);
                }
                if (ns.fileExists("SQLInject.exe", "home")) {
                    ns.print("  -> Opening SQL Port...");
                    ns.sqlinject(target);
                }
            }

            ns.nuke(target);
            ns.print(`  -> Access Granted`);
        }
        else {
            ns.print(`  -> Access Denied`);
            return;
        }
    }

    ns.print(`==> Hacking ${target}...`);
    while (true) {
        const is_secure = ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target);
        const has_viable_funds = ns.getServerMoneyAvailable(target) >= ns.getServerMaxMoney(target) * 0.75;

        if (is_secure) {
            ns.print(`  -> Weakening ${target}...`);
            await ns.weaken(target);
            ns.print(`  -> Weakened ${target}`);
        }
        else if (!has_viable_funds) {
            ns.print(`  -> Growing ${target}...`);
            await ns.grow(target);
            ns.print(`  -> Grew ${target}`);
        }
        else {
            ns.print(`  -> Hacking ${target}...`);
            await ns.hack(target);
            ns.print(`  -> Hacked ${target}`);
        }
    }
}

/** @param {NS} ns */
function disable_log(ns) {
    ns.disableLog("ALL");
}