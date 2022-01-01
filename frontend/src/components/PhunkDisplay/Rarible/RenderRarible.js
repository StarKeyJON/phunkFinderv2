import { Card } from 'react-bootstrap';
import './rarible.css';
import rarityData from '../../rarityData.json';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

function RenderRarible(props) {
    const data = props.data;

    function renderPrice(){
        try {
            return <p>Ξ {data.listingPrice}</p>
        } catch {
            return <p>No listed price...</p>
        }
    };


    function isTraitType(trait, value){
        for(var i = 1; i < rarityData.length; i++)
        {
          for(var j = 0; j < rarityData[i].pvs.length; j++) {
                if(Object.values(rarityData[i].pvs[j]).join('').includes(value)) {
                    return (rarityData[i].pvs[j][1])
                }
            }
          for(var k = 0; k < rarityData[i].pvs.length; k++) {
                if(Object.values(rarityData[i].pvs[k]).join('').includes(trait)) {
                    return (rarityData[i].pvs[k])
                }
            }
        }};

    return (
        <div className='col-12 col-md-6 col-lg-2 traits' >
            <Flippy
            flipOnHover={false} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
                // ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                    // if you pass isFlipped prop component will be controlled component.
                    // and other props, which will go to div
            >
                <FrontSide key={data.name}>
                    <Card.Img variant="top"
                        className='cardImage'
                        src={`https://img.rarible.com/prod/image/upload/prod-itemImages/0xf07468ead8cf26c752c676e43c814fee9c8cf402:${data.name}/ec5aeae0`}
                        alt={data.description}
                        key={data.name} />
                    <Card.Body className='cardBody'>
                        <Card.Title className='cardTitle fs-5'>Phunk #{data.name}</Card.Title>
                        <Card.Text className='cardText'>
                            {renderPrice()}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='cardFooter'>
                        <a className="text-muted glow" href={`https://notlarvalabs.com/market/view/phunk/${data.name}`}>Get the Phunk! </a>
                    </Card.Footer>
                </FrontSide>

                <BackSide >

                <Card.Title className='cardTitle'>Phunk #{data.name}</Card.Title>

                    {/* {rarity()} */}
                    <h5 >Rank # <div className='glow' style={{fontSize: '2bw', color: '#FF10F0'}} key={data.rank}>
                        {data.rank}
                    </div></h5>

                    {data.attributes.map((data)=>{
                        let trait = data.key
                        let value = data.value
                        let traitIndex = isTraitType(trait, value)

                        return(
                            <div className='card-text' style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px'}}>
                                <h6 key={value}>{value}</h6>
                                    <h6 className='glow' key={traitIndex}>
                                        1 of {traitIndex}
                                    </h6>
                            </div>
                            )
                    })}

                </BackSide >
            </Flippy>
        </div>
    )

}

export default RenderRarible;
