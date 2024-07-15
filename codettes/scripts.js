  document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const cardTemplate = document.getElementById('card-template');
  
    const outfits = [
      {
        id: 'VGT119',
        image: 'images/outfit6.jpg',
        description: 'Square-neck Top',
        hashtags: '#croptop  #casual  #blue  #🫐',
        price: '₹899',
        rating: 4
      },
      {
        id: 'OYRW780',
        image: 'images/outfit7.jpg',
        description: 'Long Satin Skirt',
        hashtags: '#longskirt  #peach  #night  #elegant  #✨🎀🥂',
        price: '₹1499',
        rating: 5
      },
      {
        id: 'PIU630',
        image: 'images/outfit3.jpg',
        description: 'Corset Olive Skort',
        hashtags: '#corset  #skort  #skirt  #olive',
        price: '₹1999',
        rating: 3
      },
      {
        id: 'OOT343',
        image: 'images/outfit4.jpg',
        description: 'Cottagecore Short-frock',
        hashtags: '#spring  #frock  #white  #cottagecore  #🤍🪻',
        price: '₹2999',
        rating: 4
      },
      {
        id: 'AO2223',
        image: 'images/outfit5.jpg',
        description: 'Frilled Casual Summer Top',
        hashtags: '#casual  #frilled  #summer',
        price: '₹999',
        rating: 5
      }
    ];
  
    outfits.forEach((outfit, index) => {
      const card = cardTemplate.cloneNode(true);
      card.id = `card-${index}`;
      card.querySelector('.outfit-image').src = outfit.image;
      card.querySelector('.description').textContent = outfit.description;
      card.querySelector('.item-id').textContent = `ID: ${outfit.id}`;
      card.querySelector('.hashtags').textContent = outfit.hashtags;
      card.querySelector('.price').textContent = outfit.price;
  
      const ratingElement = card.querySelector('.rating');
      ratingElement.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.innerHTML = i < outfit.rating ? '★' : '☆';
        ratingElement.appendChild(star);
      }
  
      app.appendChild(card);
    });
  
    cardTemplate.style.display = 'none';
  
    let startX, currentCard;
    const threshold = 100;
  
    app.addEventListener('mousedown', (e) => {
      currentCard = e.target.closest('.card');
      if (currentCard) {
        startX = e.clientX;
        currentCard.classList.add('dragging');
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    });
  
    async function sendOutfitStatus(outfit, status) {
      const url = `http://localhost:3000/api/${status}`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(outfit),
      });
    }
  
    function storeOutfitStatus(outfit, status) {
      const storedOutfits = JSON.parse(localStorage.getItem(status)) || [];
      storedOutfits.push(outfit);
      localStorage.setItem(status, JSON.stringify(storedOutfits));
    }
  
    function handleMouseMove(e) {
      if (!currentCard) return;
      const diffX = e.clientX - startX;
      currentCard.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.05}deg)`;
  
      if (diffX > 0) {
        likeButton.style.transform = 'scale(1.5)';
        dislikeButton.style.transform = 'scale(1)';
      } else {
        dislikeButton.style.transform = 'scale(1.5)';
        likeButton.style.transform = 'scale(1)';
      }
    }
  
    function handleMouseUp(e) {
      if (!currentCard) return;
      const diffX = e.clientX - startX;
      const outfitId = currentCard.querySelector('.item-id').textContent.split(': ')[1];
  
      if (Math.abs(diffX) > threshold) {
        const outfitData = {
          id: outfitId,
          description: currentCard.querySelector('.description').textContent,
        };
  
        if (diffX > 0) {
          sendOutfitStatus(outfitData, 'like');
          storeOutfitStatus(outfitData, 'likedOutfits');
        } else {
          sendOutfitStatus(outfitData, 'dislike');
          storeOutfitStatus(outfitData, 'dislikedOutfits');
        }
  
        currentCard.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        currentCard.style.transform = `translateX(${diffX > 0 ? '500px' : '-500px'}) rotate(${diffX * 0.05}deg)`;
        currentCard.style.opacity = '0';
        setTimeout(() => {
          currentCard.remove();
        }, 1000);
      } else {
        currentCard.style.transform = 'translateX(0) rotate(0)';
      }
  
      currentCard.classList.remove('dragging');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      currentCard = null;
  
      likeButton.style.transform = 'scale(1)';
      dislikeButton.style.transform = 'scale(1)';
    }
  
    const likeButton = document.getElementById('like-button');
    const dislikeButton = document.getElementById('dislike-button');
  });
  
  
  
  
  
  





  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  