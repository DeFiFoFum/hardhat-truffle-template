const { time, BN } = require('@openzeppelin/test-helpers');

export async function advanceNumBlocks(numberOfBlocks: string | number | typeof BN): Promise<void> {
    await time.advanceBlockTo((await time.latestBlock()).add(new BN(numberOfBlocks)));
}