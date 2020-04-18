import { observable, action, runInAction } from 'mobx'
import HttpUtil from '../util/HttpUtil'
import ApiUtil from '../util/ApiUtil'

class Calendar {
    @observable 
    currentTerm = '';

    @action
    setCurrentTerm(newTerm) {
        this.currentTerm = newTerm;
    }

    @action
    changeCurrent(term) {
        let url = ApiUtil.API_GET_TERM_DATE + encodeURI(term);
        HttpUtil.get(url)
            .then(
                re => {
                    let term = re.term[0];
                    runInAction(() => {
                        this.currentTerm = term;
                    })
                }
            ).catch(error => {
                runInAction(()=>{
                    this.setCurrentTerm('');
                })
                console.log('change term error:', error.message);
            })
    }
}

export default new Calendar()