import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useApi from '../../helpers/OlxAPI';
import { BreadCrumb, PageArea, Fake, AdImage, OthersArea } from './styled';
import { PageContainer, ErrorMessage } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


const Page = () => {
    const api = useApi();
    const {id} = useParams();


    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setLoading(true);
      const getAdInfo = async id => {
        const getOtherAds = true;
        const json = await api.getAd(id, getOtherAds);
        
  
        if (json.error) {
          const jsonErrors = [];
          for (let err in json.error) {
            console.log(err.msg);
            jsonErrors.push(json.error[err].msg);
          };
  
          setError(jsonErrors.join(', '));
        };
  
        setAdInfo(json);
        setLoading(false);
      };
      setTimeout(() => {
        getAdInfo(id);
      }, 200);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const formatDate = date => {
      const cDate = new Date(date);
  
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
      ];
  
      let cDay = cDate.getDate();
      const cMonth = cDate.getMonth();
      const cYear = cDate.getFullYear();
  
      cDay = cDay < 10 ? '0' + cDay : cDay;
  
      return `${cDay} de ${months[cMonth]} de ${cYear}`;
    };

    
    
    return (
         <PageContainer>
          {adInfo.category && 
            <BreadCrumb>
              <>
                  Você está aqui:
               <Link to="/">Home</Link>
               /
               <Link to={`/ads?state=${adInfo.stateName}`}>
                    {adInfo.stateName}
                  </Link>
               /
               <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>
                    {adInfo.category.name}
                  </Link>
               / {adInfo.title}
              </>
            </BreadCrumb>
   }
            <PageArea>
            <div className="leftSide">
              <div className="box">
                <div className="adImage">
                  {loading && <Fake height={300}/>}
                  {adInfo.images && 
                    <Slide>
                      {adInfo.images.map((img,k)=>
                        <div key={k} className="each-slide">
                          <img src={img} alt=""/>
                        </div>
                      ) }
                    </Slide>
                  }
                </div>
                <div className="adInfo">
                  <div className="adName">
                    {loading && <Fake height={55} />}
                      
                      
                    {adInfo.title &&
                          <h1>{adInfo.title}</h1>
                    }
                    {adInfo.dateCreated &&
                        <small>Criado em: {formatDate(adInfo.dateCreated)} </small>
                    }
   
                  </div>
                  <div className="adDescription">
                    {loading
                      ?
                      <Fake height={100} fillContent />
                      :
                      <>
                        <div className="adDescriptionContent">
                          {adInfo.description}
                        </div>
                        <div className="adDescriptionContentBottom">
                          <hr />
                          <small>Visualizações: {adInfo.views}</small>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="rightSide">
              <div className="box box--padding">
                {loading
                  ? <Fake height={59} />
                  : adInfo.priceNegotiable 
                    ? "Preço negociável"
                    :
                    <div className="price">
                      Preço: <span>R$ {adInfo.price}</span>
                    </div>
                }
              </div>
                 {loading && <Fake height={59} />}
                {adInfo.userInfo &&
                  <>
                  <a href={`mailto:${adInfo.userInfo.email}`} className="contactSellerLink" target="_blank" >Fale com o vendedor</a>
                  <div className="createdBy box box--padding">
                  Criado por:
                 <strong>{adInfo.userInfo.name}</strong>
                    <small>E-mail: {adInfo.userInfo.email}</small>
                    <small>Cidade: {adInfo.stateName}</small>
                  </div>
                  </>
                }
            </div>
           
          </PageArea>
        
            <OthersArea>
            {adInfo.others &&
              <>
                   <h2>Outras ofertas do vendedor</h2>
                    <div className="list">
                      {adInfo.others.map((ad,k)=>
                        <AdItem key={k} data={ad} />
                          )}
                    </div>


              </>
            }
          </OthersArea>
         </PageContainer>
    )
    }
   
    
export default Page;