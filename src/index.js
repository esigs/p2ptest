import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'

const main = async () => {
	const node = await createLibp2p ({
		addresses: {
			listen: ['/ip4/127.0.0.1/tcp/0']
		},
		transports: [tcp()],
		connectionEncrypters: [noise()],
		streamMuxers: [yamux()]
	})

	await node.start()
	console.log("libp2p has started")

	console.log("listening on addresses:")
	node.getMultiaddrs().forEach((addr) => {
		console.log(addr.toString())
	})

	await node.stop()
	console.log("libp2p has stopped")
		
}

main().then().catch(console.error)
