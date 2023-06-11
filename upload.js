const w3s = require('web3.storage');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM3OTQ0QzA5NThlMDQ5NzVlNTEzQzcwQjg3NDE2QkFEMEZmQzE1Q0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzcyMjcwNDExMTQsIm5hbWUiOiJibG9ja2NoYWluNiJ9.izQCBIA7TLvYwb0stBamYp-yshzzCYQW1-XFktKc0N4";

async function storeFiles () {
  const client = new w3s.Web3Storage({ token })

  const obj = { message: 'BlockchainLab7' }
  const buffer = Buffer.from(JSON.stringify(obj))

  const files = [
    new w3s.File([buffer], 'hello.json')
  ]

  files.push(...await w3s.getFilesFromPath("/Users/akshatagarwal/Desktop/Blockchain/blockchain7/NFT_metadata.json"))

  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

async function getFiles(cid, path) {
  const client = new w3s.Web3Storage({ token })
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }

  const files = await res.files()
  for (const file of files) {
    const filePath = `${path}/${file.name}`
    const content = await file.arrayBuffer()
    const buffer = Buffer.from(content)
    require('fs').writeFileSync(filePath, buffer)
    console.log(`Saved file to ${filePath}`)
  }
}

async function run() {
  const cid = await storeFiles()
  await getFiles(cid, "/Users/akshatagarwal/Desktop/Blockchain/blockchain7")
}

run()
