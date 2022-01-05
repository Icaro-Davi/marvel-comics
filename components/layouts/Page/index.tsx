import { Layout, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;

const PageLayout: React.FC = props => (
    <div className='app flex-column'>
        <Row className='app-background app-row' justify='center'>
            <Col xs={24} md={18} lg={14}>
                <div className='flex-column container background-white'>
                    <Header className='header background-white'>
                        <div className='logo-container'>
                            <div className='logo-position'>
                                <img src='/svg/marvel.svg' className='logo-image' />
                            </div>
                        </div>
                    </Header>
                    <Content className='content background-white flex-column'>
                        {props.children}
                    </Content>
                    <Footer className='footer background-white'>
                        <span>Desenvolvido por <a href='https://github.com/icaro-davi' target='_blank'>Icaro Davi</a></span>
                    </Footer>
                </div>
            </Col>
        </Row>
    </div >
);

export default PageLayout;