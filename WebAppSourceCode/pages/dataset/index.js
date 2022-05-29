import React from "react";
import Layout from "../../Layout/Layout";
import Image from 'next/image'
import { Typography } from "@material-ui/core";
function Datset() {
  return (
    <Layout>
    <Typography variant="h6" style={{margin:4,fontWeight:700}} >   All the information for building dataset is compeletely for project purpose and do not intend to hurt someone.</Typography>
    <Typography variant="h6" style={{margin:4,fontWeight:700}} > The pictures are collected from different resources over the internet.</Typography>

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/apoorva.jpeg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Apoorva Verma (Me)</h5>
                <p className="card-text">
                 Created This Project
                 (For Face Detection Analysis)
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/abu.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Abu Salim</h5>
                <p className="card-text">
                 Gangster
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/dawood.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Dawood Ibrahim Kaskar</h5>
                <p className="card-text">
                 Don
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/arun.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Arun Gawli</h5>
                <p className="card-text">
                Gangster-turned-politician 
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/charles.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Charles Sobhraj</h5>
                <p className="card-text">
                 Serial Killer
                </p>
                
              </div>
            </div>
          </div>
         
     

     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/gurmeet.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Gurmeet Ram Rahim Singh</h5>
                <p className="card-text">
                 Rape Conviction
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/mohan.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Mohan Kumar</h5>
                <p className="card-text">
                 Serial Killer
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/phoolan.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Phoolan Devi</h5>
                <p className="card-text">
                Woman member of that gang of dacoits
                </p>
                
              </div>
            </div>
          </div>
         

          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/devendra.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Devendra Sharma</h5>
                <p className="card-text">
                 Serial Killer
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/surindher.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Surindher Koli</h5>
                <p className="card-text">
                Noida Nithari Killing Cases
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/sushil.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Sushil Kumar</h5>
                <p className="card-text">
                 Tandoor Murder Case
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/vijay.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Vijay Mallya</h5>
                <p className="card-text">
                Owes 17 Indian banks Rs 9,000 crore
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/criminals/vikas.jpg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Vikas Dubey</h5>
                <p className="card-text">
                Indian criminal, history-sheeter, crime boss, and a gangster-turned-politician
                </p>
                
              </div>
            </div>
          </div>
         
     
        </div>
      </div>
    </Layout>
  );
}

export default Datset;
