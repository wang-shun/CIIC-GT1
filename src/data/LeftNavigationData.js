import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(Axios)

mock.onGet('/leftNavigationList').reply(200,{
  data:[
    
  ]
})
const leftNavigationList = Axios.get("/leftNavigationList")

export default {
  leftNavigationList,
}
