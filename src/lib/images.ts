const U = 'https://images.unsplash.com/photo-'
const Q = '?auto=format&fit=crop&q=85'

export const PHOTOS = {
  hero:         `${U}1504307651254-35680f356dfd${Q}&w=1920`,
  segment:      `${U}1486325212027-8081e485255e${Q}&w=1920`,
  cta:          `${U}1518709268805-4e9042af9f23${Q}&w=1920`,
  process:      `${U}1504917595217-d4dc5ebe6122${Q}&w=1200`,

  services: {
    portoes:             '/servicos/portoes-hero.png',
    grades_e_cercas:     '/servicos/grades-e-cercas-hero.png',
    escadas:             '/servicos/escadas-hero.png',
    corrimoes:           '/servicos/corrimoes-hero.png',
    estruturas_metalicas:'/servicos/estruturas-metalicas-hero.png',
    sob_medida:          '/servicos/sob-medida-hero.png',
  },

  gallery: {
    portoes: [
      `${U}1558618666-fcd25c85cd64${Q}&w=800`,
      `${U}1504307651254-35680f356dfd${Q}&w=800`,
      `${U}1518709268805-4e9042af9f23${Q}&w=800`,
      `${U}1504917595217-d4dc5ebe6122${Q}&w=800`,
      `${U}1581091226825-a6a2a5aee158${Q}&w=800`,
      `${U}1534237710431-e2fc698436d0${Q}&w=800`,
    ],
    escadas: [
      `${U}1545552987-720aa18145ca${Q}&w=800`,
      `${U}1504307651254-35680f356dfd${Q}&w=800`,
      `${U}1518709268805-4e9042af9f23${Q}&w=800`,
      `${U}1504917595217-d4dc5ebe6122${Q}&w=800`,
      `${U}1581091226825-a6a2a5aee158${Q}&w=800`,
      `${U}1534237710431-e2fc698436d0${Q}&w=800`,
    ],
    estruturas: [
      `${U}1504307651254-35680f356dfd${Q}&w=800`,
      `${U}1518709268805-4e9042af9f23${Q}&w=800`,
      `${U}1504917595217-d4dc5ebe6122${Q}&w=800`,
      `${U}1581091226825-a6a2a5aee158${Q}&w=800`,
      `${U}1534237710431-e2fc698436d0${Q}&w=800`,
      `${U}1558618666-fcd25c85cd64${Q}&w=800`,
    ],
  },
} as const
