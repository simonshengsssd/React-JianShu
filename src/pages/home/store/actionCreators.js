import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changeHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
})

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  // { List } from 'immutable'只能让整个list整体变为immutable，但是list内部的每个元素
  // 还是普通的js对象，因此不能用List， 这里还是乖乖用fromJS比较好
  list: fromJS(list),
  nextPage
})

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then((res) => {
      // console.log(res);
      const result = res.data.data;
      // 这边dispatch action，无论是在根目录下的reducer还是pages/home下的reducer都是能
      // 接受到action
     dispatch(changeHomeData(result));
    });
  }
}


export const getMoreList = (page) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?page=' + page).then((res) => {
      const result = res.data.data;
      dispatch(addHomeList(result, page + 1));
      // console.log(result);
    });
  }
  // return (dispatch) => {
  //   console.log('click')
  // }
}

export const toggleTopShow = (show) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
})