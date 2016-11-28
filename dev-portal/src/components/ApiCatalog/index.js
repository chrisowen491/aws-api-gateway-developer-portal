import React from 'react'
import { Link } from 'react-router'
import { Button, Card, Image, Dropdown } from 'semantic-ui-react'
import { addSubscription, unsubscribe, isSubscribed } from '../../services/api-catalog'
import { isAuthenticated } from '../../services/self'
import Usage from '../Usage'

function handleSubscribe(event, api) {
  event.preventDefault()

  addSubscription(api.usagePlanId)
}

function handleUnsubscribe(event, api) {
  event.preventDefault()

  unsubscribe(api.usagePlanId)
}

const SubscribedApiActionsDropdown = ({api}) => (
  <Dropdown text='Actions' button>
    <Dropdown.Menu>
      <Usage api={api} />
      <Dropdown.Item onClick={event => handleUnsubscribe(event, api)}>Unsubscribe</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>)

const SubscribeButton = ({api}) => (
  isAuthenticated() ? <Button onClick={event => handleSubscribe(event, api)}>Subscribe</Button> : <a href='https://aws.amazon.com/marketplace/' target='_blank'><Button>Subscribe!</Button></a>
)
const ApiCard = api => (
<Card key={api.apiId} style={{textAlign: 'center'}}>
  <Link to={`apis/${api.apiId}`} style={{background: 'rgba(0, 0, 0, 0.05)'}}><Image src={api.image} style={{margin: 'auto'}} /></Link>
  <Card.Content>
    <Card.Header><Link to={`apis/${api.apiId}`}>{api.swagger.info.title}</Link></Card.Header>
    <Card.Meta>
      <span className='date'>Version {api.swagger.info.version}</span>
    </Card.Meta>
    <Card.Description>{api.swagger.info.description}</Card.Description>
  </Card.Content>
  <Card.Content extra>
    { isSubscribed(api) ? <SubscribedApiActionsDropdown api={api} /> : <SubscribeButton api={api} />}
  </Card.Content>
</Card>)

export default ({ apis }) => (
  <Card.Group itemsPerRow={3}>
    {apis.map(ApiCard)}
  </Card.Group>)
