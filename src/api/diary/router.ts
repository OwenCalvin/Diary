import { Server } from 'socket.io'
import { DiaryController } from './controller'

const WHSocials = [
  'twitter',
  'soundcloud',
  'youtube'
]

export default (io: Server) => {
  const diaryController = new DiaryController(io)
  return WHSocials.map(s => ({
    method: 'post',
    route: `/${s}`,
    functions: (req, res) => diaryController[s](req, res)
  }))
}
