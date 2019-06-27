import axios from '@/utlis/axios'
const host = 'http://10.10.254.100:41107/api/v1'

export const getnodes = () => {
  return axios.get('/mining_nodes')
}
export const getnodeInfo = host + '/mining_nodes'
