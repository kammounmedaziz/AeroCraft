import React, { useState, useEffect } from 'react';
import ProfileCard from '../Components/ProfileCard'; // Adjust the import path as needed

import AOS from 'aos';
import 'aos/dist/aos.css';
import {  Sparkles } from "lucide-react"

const Team = () => {
  const [teamImages, setTeamImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeamImages = async () => {
      try {
        setLoading(true);
        
        // Method 1: Using dynamic imports (requires bundler support)
        // This approach works with Webpack/Vite and similar bundlers
        const imageModules = import.meta.glob('/public/imgs/team/*.{png,jpg,jpeg,webp,gif}');
        
        const imagePromises = Object.entries(imageModules).map(async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.split('/').pop();
          
          return {
            id: fileName,
            avatarUrl: module.default || path,
            path: path
          };
        });

        const images = await Promise.all(imagePromises);
        
        // Sort by filename
        images.sort((a, b) => a.id.localeCompare(b.id));
        
        setTeamImages(images);
      } catch (err) {
        console.error('Error loading team images:', err);
        
        // Fallback: Manual list of images
        // Add your image paths here
        const fallbackImages = [
          { 
            id: 'yassmine.png', 
            avatarUrl: '/imgs/team/yassmine.png' 
          },
          // Add more images here as needed
          // { 
          //   id: 'image2.png', 
          //   avatarUrl: '/imgs/team/image2.png' 
          // },
        ];
        
        setTeamImages(fallbackImages);
        setError('Using fallback images. Make sure images are in /public/imgs/team/');
      } finally {
        setLoading(false);
      }
    };

    loadTeamImages();
  }, []);

  if (loading) {
    return (
      <div className="team-page" >
        <div className="team-container">
          <h2 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f1636f] to-[#a855f7]" 
            data-aos="zoom-in-up"
            data-aos-duration="600"
            >
        Our Team
      </h2>
            <p 
                className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
                data-aos="zoom-in-up"
                data-aos-duration="800"
                >
                <Sparkles className="w-5 h-5 text-red-400" />
                    Meet The Amazing Team Behind AeorCraft
                <Sparkles className="w-5 h-5 text-red-400" />
            </p>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading team images...</p>
          </div>
        </div>
        
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            gap: 1rem;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="team-page" id="Team">
      <div className="team-container">
        <header className="team-header">
          <h1 className="team-title">Our Team</h1>
          <p className="team-subtitle">Meet the amazing people behind our success</p>
        </header>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="team-grid">
          {teamImages.map((image) => (
            <div key={image.id} className="team-member">
              <ProfileCard
                avatarUrl={image.avatarUrl}
                className="team-profile-card-small"
                enableTilt={true}
                showBehindGradient={true}
              />
            </div>
          ))}
        </div>

        {teamImages.length === 0 && !loading && (
          <div className="empty-state">
            <p>No images found. Make sure images are placed in the /public/imgs/team/ folder.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .team-page {
          min-height: 100vh;
          
          padding: 2rem 0;
        }

        .team-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .team-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .team-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .team-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
          font-weight: 300;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .error-message {
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid rgba(255, 193, 7, 0.5);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #ffc107;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          justify-items: center;
          align-items: start;
        }

        .team-member {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .team-member:hover {
          transform: translateY(-5px);
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
        }

        .team-profile-card-small {
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3));
          transform: scale(0.65);
          transform-origin: center;
        }

        .team-profile-card-small:hover {
          transform: scale(0.7);
        }

        @media (max-width: 768px) {
          .team-page {
            padding: 1rem 0;
          }
          
          .team-container {
            padding: 0 1rem;
          }
          
          .team-title {
            font-size: 2.5rem;
          }

          .team-subtitle {
            font-size: 1.1rem;
          }
          
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
          }
          
          .team-header {
            margin-bottom: 2rem;
          }

          .team-profile-card-small {
            transform: scale(0.55);
          }

          .team-profile-card-small:hover {
            transform: scale(0.6);
          }
        }

        @media (max-width: 480px) {
          .team-title {
            font-size: 2rem;
          }

          .team-subtitle {
            font-size: 1rem;
          }
          
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }

          .team-profile-card-small {
            transform: scale(0.5);
          }

          .team-profile-card-small:hover {
            transform: scale(0.55);
          }
        }
      `}</style>
    </div>
  );
};

export default Team;