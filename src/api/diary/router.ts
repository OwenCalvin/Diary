import { Server } from 'socket.io'
import DiaryController from './controller'

const WHSocials = [
  'facebook',
  'twitter',
  'soundcloud',
  'spotify',
  'instagram',
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
