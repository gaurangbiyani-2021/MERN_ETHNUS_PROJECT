import React from 'react'
import '../styles/team.css'
import team01 from '../images/team-01.png'
import team02 from '../images/team-02.png'
import team03 from '../images/team-03.png'
import team04 from '../images/team-04.png'
import team05 from '../images/team-05.png'


const teamMembers = [
    {
        imgUrl: team01,
        name: 'Nirbhay Tiwari',
        position: 'Frontend Developer',
        social: {
            linkedin: 'https://www.linkedin.com/in/nirbhay-tiwari-b09817219/',
            github: 'https://github.com/Nirbhay-279',
          }

    },

    {
        imgUrl: team04,
        name: 'Dhruv Mehta',
        position: 'Frontend Developer',
        social: {
            linkedin: 'https://www.linkedin.com/in/dhruv-mehta-b50b8a235/',
            github: 'https://github.com/dhruvmehta2003',
          }
    },

    {
        imgUrl: team03,
        name: 'Niket Suchak',
        position: 'Backend Developer',
        social: {
            linkedin: 'https://www.linkedin.com/in/niket-suchak/',
            github: 'https://github.com/niketsuchak',
          }
    },

    {
        imgUrl: team02,
        name: 'Gaurang Biyani',
        position: 'Full Stack Developer',
        social: {
            linkedin: 'https://www.linkedin.com/in/gaurang-biyani-6a4549235/',
            github: 'https://github.com/gaurangbiyani-2021',
          }
    },

    {
        imgUrl: team05,
        name: 'Rishank Gattani',
        position: 'Frontend Developer',
        social: {
            linkedin: 'https://www.linkedin.com/in/nirbhay-tiwari-b09817219/',
            github: 'https://github.com/nirbhay-tiwari',
          }
    },
]

const Team = () => {
    return (
        <section className='our__team'>
            <div className='container'>
                <div className='team__content'>
                    <h5 className='subtitle'> Team</h5>
                    <h2>
                        The Team <span className='highlight'>Behind</span>
                    </h2>
                </div>
                <div className='team__wrapper'>
                    {
                        teamMembers.map((item, index) => (
                            <div className='team__item' key={index}>
                                <div className='team__img'>
                                    <img src={item.imgUrl} alt='' />
                                </div>
                                <div className='team__details'>
                                    <h4>{item.name}</h4>
                                    <p className='description'>{item.position}</p>

                                    <div className='team__member-social'>
                                        <span> <a href={item.social.linkedin} target='_blank' rel='noopener noreferrer'><i class='ri-linkedin-line'></i></a></span>
                                        <span> <a href={item.social.github} target='_blank' rel='noopener noreferrer'><i class='ri-github-line'></i></a></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Team