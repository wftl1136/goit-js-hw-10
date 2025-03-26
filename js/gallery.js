const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];
  
  
  const gallery = document.querySelector('.gallery');
  const galleryItems = images.map(({ preview, original, description }) => {
    return `<li class="gallery-item">
    <a class="gallery-link" href="${original}">
      <img
        class="gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
  }).join('');
  
  gallery.innerHTML = galleryItems;
  
  
  let instance = null;
  let currentIndex = 0;
  
  gallery.addEventListener('click', clickOpenModal);
  
  function clickOpenModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    const imgUrl = event.target.dataset.source;
    currentIndex = images.findIndex(images => images.original === imgUrl);
    console.log("🚀 ~ clickOpenModal ~ currentIndex:", currentIndex)
    
    console.log("🚀 ~ clickOpenModal ~ currentIndex:", currentIndex)
      instance = basicLightbox.create(
        `<img src="${imgUrl}" width = '1112px' height = '640px'>`, {
        onShow: () => {
          document.addEventListener('keydown', navigationModal);
        },
        onClose: () => {
          document.removeEventListener('keydown', navigationModal);
          instance = null;
        },
      });
      instance.show();
   }
  
  
  function navigationGallery(event) {
     
   }
  
  function navigationModal(event) {
    if (!instance) {
      return;
    }
    event.preventDefault();
    console.log("🚀 ~ navigationModal ~ event.key:", event.key)
    if (event.key === '5' || event.key === ' '|| event.key === 'Escape' || event.key === "Enter" ) {
      instance.close();
      return;
    }
    if ((event.key === 'ArrowLeft' ||event.key === 'ArrowDown' || event.key === 'A'|| event.key === 'a' || event.key === '4'|| event.key === "numpad4" ) ) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage();
    }
    if ((event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === '6'|| event.key === 'd' || event.key === 'D'|| event.key === "numpad6" ) ) {
      currentIndex = (currentIndex + 1 + images.length) % images.length;
      updateModalImage();
    }
  }
  
  function updateModalImage() {
    const newImgUrl = images[currentIndex].original;
    const modalImg = instance.element().querySelector('img');
    modalImg.src = newImgUrl;
  
  }