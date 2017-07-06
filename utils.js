export function verifyPackageExists(){
    if(!packageExists()){
    console.info("package.json not found in project dir");
    process.exit(-1);
    }
}
module.exports.verifyPackageExists = verifyPackageExists;


export function packageExists() {
    var pkgPath = path.resolve("package.json");
    try {
        require.resolve(pkgPath);
        // Remove cached copy for future checks
        delete require.cache[pkgPath];
        return true;
    } catch (e) {
        return false;
    }
}

module.exports.packageExists = packageExists;