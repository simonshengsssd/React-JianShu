import { fromJS } from 'immutable';
import * as constants from './constants';


const defaultState =  fromJS({
  topicList:[],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: true
});

const changeHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList)
  });
};

const addArticleList = (state, action) => {
  return state.merge({
    'articleList': state.get('articleList').concat(action.list),
    'articlePage': action.nextPage
  });
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      // 在store里的topicList是一个fromJs的immutable对象，而action.topicList
      // 是一个JS对象，不能简单用set，这样两者数据类型不一样，因此下面一行写法不对
      // state.set('topicList', action.topicList)
      // 改成这样
       return changeHomeData(state, action)
    case constants.ADD_ARTICLE_LIST:
        return addArticleList(state, action);
    case constants.TOGGLE_SCROLL_TOP:
      return state.set('showScroll', action.show)
    default:
      return state;
  }
}

