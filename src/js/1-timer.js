import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

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

//створюємо елементи галереї і вставляємо їх в розмітку нашої сторінки
const gallery = document.querySelector('.gallery');
const galleryItems = images.map(({ preview, original, description }) => {
  return `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`
}).join('');

gallery.innerHTML = galleryItems;


// Підключення галереї simpleLightbox;
const simpleLightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

//Додаємо підримку додаткових клавіш для навігації(хто для яких привик 😀)
document.addEventListener('keydown', navigationSimple);

const isLightboxOpen = document.querySelector('.sl-lightbox.is-open');
let activeIndex = 0;
const galleryArray = Array.from(document.querySelectorAll('.gallery-item'));

function navigationSimple(event) {
    console.log("🚀 ~ simpleLightbox.isOpen ~ simpleLightbox.isOpen:", simpleLightbox.isOpen)
    
    if (event.key === '5' || event.key === ' ' || event.key === 's' || event.key === 'S' || event.key === 'Enter') {
        event.preventDefault();
        if (simpleLightbox.isOpen) {
            simpleLightbox.close()
        } else {
            const activeItem = galleryArray[activeIndex];
            const link = activeItem.querySelector('.gallery-link');
            simpleLightbox.open(link);
        }
    } else if ((event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a' || event.key === '4' || event.key === "numpad4")) {
        if (simpleLightbox.isOpen) {
            if (event.key === 'ArrowLeft') {
                return;
            } else {
                simpleLightbox.prev();
            }
        } else {
            activeIndex = (activeIndex > 0) ? activeIndex - 1 : galleryArray.length - 1;
            updateActiveImg(activeIndex);
        }
    } else if ((event.key === 'ArrowRight' || event.key === 'D' || event.key === 'd' || event.key === '6' || event.key === "numpad6")) {
        if (simpleLightbox.isOpen) {
            if (event.key === 'ArrowRight') {
                return;
            } else {
                simpleLightbox.next();
            }
        } else {
            activeIndex = (activeIndex < galleryArray.length - 1) ? activeIndex + 1 : 0;
            console.log("🚀 ~ navigationGallery ~ activeIndex:", activeIndex)
            updateActiveImg(activeIndex);
        }
        // Додаємо підтримку zoom за допомогою клавіш +/-
  /*//P.S. Не вийшло реалізувати ) ...в галереї є підртимка zoom
 за допомогою мишки, думав можна отримати доступ
 до zoom, за допомогою zoomIn, zoomOut. не получається ) якщо можна якост реалізувати 
буду вдячний за підказку 

    } else if (event.key === '+' || event.key === '-') {
        if (!simpleLightbox.isOpen) {
            return;
        } else {
            if (event.key === '+') {
                event.preventDefault();
                simpleLightbox.zoomIn();
            } else if (event.key === '-') {
                event.preventDefault();
                simpleLightbox.zoomOut();
            }
        }
        */
    }
}


function updateActiveImg() {
    galleryArray.forEach(item => item.classList.remove("active"));
    const activeItem = galleryArray[activeIndex];
    console.log("🚀 ~ activeIndex ~ activeIndex:", activeIndex);
    console.log("🚀 ~ updateActiveImg ~ activeItem:", activeItem)

    activeItem.classList.add("active");
    const link = activeItem.querySelector('.gallery-link');
    link.focus();
}
