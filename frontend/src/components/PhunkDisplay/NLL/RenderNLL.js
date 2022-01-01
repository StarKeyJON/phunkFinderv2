import { Card } from 'react-bootstrap';
import './NLL.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import rarityData from '../../rarityData.json';

function RenderNLL(props) {

    const data = props.data;


    function isTraitType(trait, value) {
        for (var i = 1; i < rarityData.length; i++) {
            for (var j = 0; j < rarityData[i].pvs.length; j++) {
                if (Object.values(rarityData[i].pvs[j]).join('').includes(value)) {
                    return (rarityData[i].pvs[j][1])
                }
            }
            for (var k = 0; k < rarityData[i].pvs.length; k++) {
                if (Object.values(rarityData[i].pvs[k]).join('').includes(trait)) {
                    return (rarityData[i].pvs[k])
                }
            }
        }
    };

    function renderTraits() {
        const entries = Object.entries(data.attributes)

        return (
            <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                {entries.map((trait) => {
                    if(typeof trait != 'string'){
                        
                    let t = (trait[1].trait_type)
                    let v = (trait[1].value)
                    let traitIndex = isTraitType(t, v)
                    return (
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                            <h6>{v}</h6>
                            <h6 className='glow'>1 of {traitIndex}</h6>
                        </div>
                        )
                    }  
                })
                }

            </div>
        )
    };
    return (
        <div className='col-12 col-md-6 col-lg-2 traits'>
            <Flippy
                flipOnHover={false} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal"
            >
                <FrontSide>

                    <Card.Img variant="top"
                        src={`https://img.rarible.com/prod/image/upload/prod-itemImages/0xf07468ead8cf26c752c676e43c814fee9c8cf402:${data.name}/ec5aeae0`}
                        alt={data.name}
                        key={data.id} />
                    <Card.Body>
                        <Card.Title className='test-responsive fs-5'>Phunk #{data.name}</Card.Title>
                        <div>{data.listingPrice}</div>
                    </Card.Body>
                    <Card.Footer>
                        <a className="text-muted glow" href={`https://notlarvalabs.com/market/view/phunk/${data.name}`}>Get the Phunk! </a>
                    </Card.Footer>

                </FrontSide>

                <BackSide >

                    <Card.Title className='cardTitle'>Phunk #{data.name}</Card.Title>
                    {/* {rarity()} */}
                    <Card.Text style={{ fontSize: '2bw' }}>
                        <div>Rank # 
                            <p className='glow' style={{ fontSize: '2bw', color: '#FF10F0' }}>
                                {data.rank}
                            </p>
                        </div>
                    </Card.Text>

                    <div>{renderTraits()}</div>

                </BackSide >
            </Flippy>
        </div>
    )
}

export default RenderNLL;
