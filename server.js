import express from 'express'
import path from 'path'
import { config } from 'dotenv'
import { initiateApp } from './src/utils/initiateApp.js'

const app = express()
config({ path: path.resolve('./config/config.env') })

// Set EJS as the view engine , set up a template engine
app.set('view engine', 'ejs')
app.use('/public', express.static('./public'))


initiateApp(app, express)


