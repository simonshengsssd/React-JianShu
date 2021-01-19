import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './Components/Topic';
import List from './Components/List';
import Recommend from './Components/Recommend';
import Writer from './Components/Writer';
import { actionCreators } from './store';
import { BackTop } from './style';

import { 
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './style';


// PureComponent在底层实现了在shouldComponentUpdate的功能， 可以让一些和store
// 联系不密切的组件在store数据发生改变后不用多次重复渲染
// 同时，用PureComponent的前提是store中的数据用了ImmutableJS
class Home extends PureComponent {

  handleScrollTop() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img 
            className='banner-image' 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/To_aru_kagaku_no_railgun_logo_horizontal.svg" 
            alt=''
          />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>Back</BackTop> : null}
      </HomeWrapper> 
    )
  }

  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }
  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

}

const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeInfo());
  },

  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
});

export default connect(mapState, mapDispatch)(Home)