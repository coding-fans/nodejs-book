#! /usr/bin/env node
const path = require('path')
const fs =  require('fs')
const { createHash } = require('crypto')

const argv = process.argv
const prefix = `http://cdn.fasionchan.com/course`
const tmp = argv[2]
const host = argv[3]

function md5 (data) {
  return createHash('md5').update(data).digest('hex')
}

if (!tmp || !host) {
  console.log('请输入两个参数')
  return
}

const directory = path.resolve(__dirname, tmp)

try {
  let txt = ''
  const files = fs.readdirSync(directory, {
    withFileTypes: true
  })
  files.forEach((file) => {
    let filePath = path.resolve(directory, file.name)
    let extname = path.extname(filePath)
    let con = fs.readFileSync(filePath)
    let md5num = md5(con)
    let newFilePath = path.resolve(directory, md5num + extname)
    fs.renameSync(filePath, newFilePath)
    console.log(`${file.name} ===============> ${md5num}${extname}`)
    txt += `![](${prefix}/${host}/${md5num}${extname})\n`
  })

  fs.writeFileSync('pic.md', txt, 'utf8')

} catch(err) {
  console.log('失败了')
  console.log(err)
}

