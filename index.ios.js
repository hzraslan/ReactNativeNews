/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
'use strict';

var React = require('react-native');

var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} = React;

var NEWS_LIST_API_URL = 'http://88.studyteam.sinaapp.com/rnn_news_list.json';

var ReactNativeNews = React.createClass({

    getInitialState : function() {
        return {
            dataSource : new ListView.DataSource({
                rowHasChanged : (row1, row2) => row1 !== row2
            }),
            loaded : false
        }
    },

    componentDidMount : function() {
        this.fetchData();
    },
    fetchData : function() {
        fetch(NEWS_LIST_API_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(responseData),
                    loaded : true,
                });
            })
            .done();
    },
    render : function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={this.renderNews}
                style={styles.listView} />
        );
    },
    renderLoadingView : function() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading News...
                </Text>
            </View>
        );
    },
    renderNews : function(news) {
        return (
            <View style={styles.container}>
                <Image 
                source={{uri : news.pic}}
                style={styles.newsPic} />
                <View style={styles.rightContainer}>
                    <Text style={styles.newsTitle}>{news.title}</Text>
                    <Text style={styles.newsSummary}>{news.summary}</Text>
                </View>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    newsItem: {
        
    },
    newsPic : {
        width : 90,
        height : 60,
        margin: 10,
    },
    newsTitle : {
        color : '#4f4f4f',
        fontSize : 16,
        marginBottom : 10,
        textAlign : 'left',
    },
    newsSummary : {
        marginRight : 10,
        color : '#bababa',
        fontSize : 14,
        textAlign : 'left',
    },
});

AppRegistry.registerComponent('ReactNativeNews', () => ReactNativeNews);