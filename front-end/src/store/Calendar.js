import { observable } from 'mobx'

class Calendar {
    @observable 
    currentYear = undefined
    @observable 
    currentOrder = undefined
}

export default new Calendar()