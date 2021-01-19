import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
  render() {
    const { list, getMoreList, page } = this.props;
    return (
      <div>
        {
          list.map((item, index) => {
            return (
              <Link key={index} to={'/detail/' + item.get('id')} >
                <ListItem >
                  <img 
                    className='List-pic' 
                    src={item.get('imgUrl')}
                    alt=''
                  />
                  <ListInfo>
                    <h3 className='title'>{item.get('title')}</h3>
                    <p className='discription'>{item.get('discription')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            );
          })
        }
        {/* 点击按钮之后会加载更多的数据，因此这里用的是ajax异步数据请求 */}
        <LoadMore onClick={() => getMoreList(page)}>
          More
        </LoadMore>
      </div>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
})
  
const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    dispatch(actionCreators.getMoreList(page))
  }
})

export default connect(mapState, mapDispatch)(List)