// CRITIQ Movie Data
// Experience-based ratings: Masterpiece, Absolute Cinema, Go For It, Timepass, Average, Worst

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Joseph Gordon-Levitt"],
    genres: ["Sci-Fi", "Action", "Thriller"],
    themes: ["Dreams", "Reality", "Memory", "Subconscious"],
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://image.tmdb.org/t/p/w500/9gk7admal4R12L2jS3f8Q9X3is.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English", "Hindi", "Spanish"], aiSubtitles: ["Hindi", "Tamil", "Telugu"], aiDubbing: ["Hindi", "Tamil"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["English", "Hindi"], aiSubtitles: ["Hindi"], aiDubbing: ["Hindi"] }
    ],
    category: "must-watch"
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    genres: ["Action", "Crime", "Drama"],
    themes: ["Justice", "Chaos", "Morality", "Heroism"],
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "HBO Max", quality: "4K", audioLanguages: ["English", "Spanish"], aiSubtitles: ["English", "Spanish"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 3,
    title: "Dilwale Dulhania Le Jayenge",
    year: 1995,
    director: "Aditya Chopra",
    actors: ["Shah Rukh Khan", "Kajol", "Amrish Puri", "Karisma Kapoor"],
    genres: ["Romance", "Drama"],
    themes: ["Love", "Family", "Tradition", "Longing"],
    synopsis: "When Raj meets Simran in Europe, it isn't love at first sight but when Simran moves to India for an arranged marriage, Raj follows her, pledging to win her back.",
    poster: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi", "Tamil", "Telugu"], aiSubtitles: ["English", "Tamil", "Telugu"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 4,
    title: "3 Idiots",
    year: 2009,
    director: "Rajkumar Hirani",
    actors: ["Aamir Khan", "R. Madhavan", "Sharman Joshi", "Kareena Kapoor"],
    genres: ["Comedy", "Drama"],
    themes: ["Education", "Friendship", "Dreams", "Pressure"],
    synopsis: "Two friends are searching for a long lost buddy. This journey takes them around India, where they learn that the key to life is not a diploma but a simple three-letter word - ICE.",
    poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["Hindi", "Tamil", "Telugu"], aiSubtitles: ["English", "Tamil", "Telugu"], aiDubbing: ["Tamil", "Telugu"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 5,
    title: "Lagaan",
    year: 2001,
    director: "Ashutosh Gowariker",
    actors: ["Aamir Khan", "Gracy Singh", "Rachel Shelley", "Kulbhushan Kharbanda"],
    genres: ["Drama", "Sport", "History"],
    themes: ["Colonialism", "Unity", "Cricket", "Resistance"],
    synopsis: "The villagers of a territory in British-controlled India decide to play a cricket match against their colonizers to win their freedom.",
    poster: "https://image.tmdb.org/t/p/w500/yNX9lFRAFeNLNRIXdqZK9gYrYKa.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "SonyLIV", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    genres: ["Drama"],
    themes: ["Hope", "Friendship", "Freedom", "Redemption"],
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English", "Spanish"], aiSubtitles: ["English", "Spanish", "Hindi"], aiDubbing: ["Hindi", "Spanish"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["English"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 7,
    title: "Pathaan",
    year: 2023,
    director: "Siddharth Anand",
    actors: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham", "Dimple Kapadia"],
    genres: ["Action", "Thriller"],
    themes: ["Patriotism", "Terrorism", "Mission", "Redemption"],
    synopsis: "A Pakistani general and his mentor plan to attack India with a deadly chemical weapon. Only Pathaan, a RAW agent, can stop them.",
    poster: "https://image.tmdb.org/t/p/w500/tm2T5jWbELlT3X7lJKH3wJTTpQZ.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["Hindi", "Tamil", "Telugu"], aiSubtitles: ["English", "Tamil", "Telugu"], aiDubbing: ["Tamil", "Telugu"] },
      { platform: "Amazon Prime", quality: "4K", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 8,
    title: "Pather Panchali",
    year: 1955,
    director: "Satyajit Ray",
    actors: ["Kanu Banerjee", "Uma Das Gupta", "Subir Banerjee", "Chunibala Devi"],
    genres: ["Drama"],
    themes: ["Childhood", "Poverty", "Rural Life", "Art"],
    synopsis: "Impressed with the young girl Durga's independent spirit, her older cousin feels neglected and plans to leave.",
    poster: "https://image.tmdb.org/t/p/w500/gSuHDeWemA1menrwfMRChnSmMVN.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "MUBI", quality: "Full HD", audioLanguages: ["Bengali"], aiSubtitles: ["English", "Hindi"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 9,
    title: "KGF: Chapter 2",
    year: 2022,
    director: "Prashanth Neel",
    actors: ["Yash", "Sanjay Dutt", "Raveena Tandon", "Prakash Raj"],
    genres: ["Action", "Drama", "Crime"],
    themes: ["Power", "Ambition", "Revenge", "Gold"],
    synopsis: "The blood-soaked tale of a criminal's rise to power in the gold mines of Kolar.",
    poster: "https://image.tmdb.org/t/p/w500/pLj6YJWawvHqIRVxKXXHVqKvKKh.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Amazon Prime", quality: "4K", audioLanguages: ["Hindi", "Kannada", "Tamil", "Telugu"], aiSubtitles: ["English", "Hindi", "Tamil", "Telugu"], aiDubbing: ["Hindi", "Tamil", "Telugu"] },
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 10,
    title: "Sholay",
    year: 1975,
    director: "Ramesh Sippy",
    actors: ["Dharmendra", "Amitabh Bachchan", "Sanjeev Kumar", "Hema Malini"],
    genres: ["Action", "Adventure", "Comedy"],
    themes: ["Revenge", "Friendship", "Courage", "Justice"],
    synopsis: "After his family is killed, a former hired gun is asked to help a police officer capture a dangerous criminal.",
    poster: "https://image.tmdb.org/t/p/w500/ya9bwgqA4eNl5bQ9QqS0jcmRoBS.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "SonyLIV", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Netflix", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 11,
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    genres: ["Sci-Fi", "Adventure", "Drama"],
    themes: ["Love", "Time", "Space", "Survival"],
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English", "Hindi", "Spanish"], aiSubtitles: ["Hindi", "Tamil", "Telugu", "Spanish"], aiDubbing: ["Hindi", "Spanish"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["English", "Hindi"], aiSubtitles: ["English", "Hindi"], aiDubbing: ["Hindi"] }
    ],
    category: "must-watch"
  },
  {
    id: 12,
    title: "Chhichhore",
    year: 2019,
    director: "Nitesh Tiwari",
    actors: ["Sushant Singh Rajput", "Shraddha Kapoor", "Varun Sharma", "Prateik Babbar"],
    genres: ["Comedy", "Drama"],
    themes: ["Engineering College", "Friendship", "Failure", "Success"],
    synopsis: "A group of alumni travel back to their college to relive the fun and lessons they learned there.",
    poster: "https://image.tmdb.org/t/p/w500/cGDPQtQ5igtPMt3oJ6BCAor6dFp.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Hotstar", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 13,
    title: "Andhadhun",
    year: 2018,
    director: "Sriram Raghavan",
    actors: ["Ayushmann Khurrana", "Tabu", "Radhika Apte", "Anil Dhawan"],
    genres: ["Thriller", "Mystery", "Crime"],
    themes: ["Blindness", "Murder", "Deception", "Chaos"],
    synopsis: "A piano player who becomes an accidental witness to a murder gets entangled in the investigation.",
    poster: "https://image.tmdb.org/t/p/w500/dy3K6hNvwE05siGgiLJcEiwgpdO.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 14,
    title: "Dangal",
    year: 2016,
    director: "Nitesh Tiwari",
    actors: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra", "Zaira Wasim"],
    genres: ["Drama", "Biography", "Sport"],
    themes: ["Gender Equality", "Family", "Perseverance", "Dreams"],
    synopsis: "Former wrestler Mahavir Singh Phogat trains his daughters Geeta and Babita to become world-class wrestlers.",
    poster: "https://image.tmdb.org/t/p/w500/1CoKNi3XVyijPCvy0usDbSWEXAg.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["Hindi", "Tamil", "Telugu"], aiSubtitles: ["English", "Tamil", "Telugu"], aiDubbing: ["Tamil", "Telugu"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 15,
    title: "Mersal",
    year: 2017,
    director: "Atlee",
    actors: ["Vijay", "Samantha Ruth Prabhu", "Kajal Aggarwal", "Nithya Menen"],
    genres: ["Action", "Drama", "Thriller"],
    themes: ["Doctors", "Revenge", "Mystery", "Family"],
    synopsis: "A doctor uses his skills to expose a medical scam while unraveling a mysterious case involving twins.",
    poster: "https://image.tmdb.org/t/p/w500/65Q1wpRPZ5E3UVUv2V5JBbJQCcj.jpg",
    experienceRating: "Timepass",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Tamil", "Telugu", "Hindi"], aiSubtitles: ["English", "Hindi", "Telugu"], aiDubbing: ["Hindi"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Tamil"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 16,
    title: "Gangs of Wasseypur",
    year: 2012,
    director: "Anurag Kashyap",
    actors: ["Manoj Bajpayee", "Richa Chadda", "Nawazuddin Siddiqui", "Piyush Mishra"],
    genres: ["Crime", "Drama", "Action"],
    themes: ["Family Feud", "Politics", "Revenge", "Coal Mining"],
    synopsis: "A glimpse into the underworld of India's Dhanbad, where coal magnates rule with an iron fist.",
    poster: "https://image.tmdb.org/t/p/w500/xAy208Znkingmfnb5ZbULwLyIwW.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "ZEE5", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 17,
    title: "PK",
    year: 2014,
    director: "Rajkumar Hirani",
    actors: ["Aamir Khan", "Anushka Sharma", "Sanjay Dutt", "Boman Irani"],
    genres: ["Comedy", "Drama", "Sci-Fi"],
    themes: ["Religion", "Alien", "Faith", "Society"],
    synopsis: "An alien lands on Earth and questions the religious practices of humans.",
    poster: "https://image.tmdb.org/t/p/w500/z2x2Y4tncefsIU7h82gmUM5vnBJ.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 18,
    title: "Memento",
    year: 2000,
    director: "Christopher Nolan",
    actors: ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano", "Mark Boone Junior"],
    genres: ["Thriller", "Mystery"],
    themes: ["Memory", "Revenge", "Amnesia", "Truth"],
    synopsis: "A man with short-term memory loss attempts to find his wife's killer.",
    poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["English"], aiSubtitles: ["English", "Hindi", "Spanish"], aiDubbing: ["Hindi"] },
      { platform: "Amazon Prime", quality: "HD", audioLanguages: ["English"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 19,
    title: "Jawan",
    year: 2023,
    director: "Atlee",
    actors: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi", "Deepika Padukone"],
    genres: ["Action", "Thriller"],
    themes: ["Social Justice", "Revenge", "Politics", "Mission"],
    synopsis: "A man embarks on a mission to correct the system and bring justice to the people.",
    poster: "https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
    experienceRating: "Timepass",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["Hindi", "Tamil", "Telugu"], aiSubtitles: ["English", "Tamil", "Telugu"], aiDubbing: ["Tamil", "Telugu"] },
      { platform: "Amazon Prime", quality: "4K", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 20,
    title: "UI",
    year: 2024,
    director: "Upendra",
    actors: ["Upendra", "Redhika Apte", "Murali Sharma", "Srinidhi Shetty"],
    genres: ["Sci-Fi", "Drama", "Thriller"],
    themes: ["AI", "Humanity", "Emotions", "Technology"],
    synopsis: "A political thriller that explores the dark side of power and manipulation in modern society.",
    poster: "https://image.tmdb.org/t/p/w500/tWoeysV4ro6wn4TE0QgqMuo6Val.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Kannada", "Telugu", "Hindi"], aiSubtitles: ["English", "Hindi", "Telugu"], aiDubbing: ["Hindi", "Telugu"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Kannada"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 21,
    title: "Kabir Singh",
    year: 2019,
    director: "Sandeep Reddy Vanga",
    actors: ["Shahid Kapoor", "Kiara Advani", "Arunoday Singh", "Sana Saeed"],
    genres: ["Romance", "Drama"],
    themes: ["Love", "Obsession", "Anger", "Redemption"],
    synopsis: "A surgeon goes into a self-destructive spiral after his girlfriend leaves him.",
    poster: "https://image.tmdb.org/t/p/w500/unqiPjtc6CGqs13zho7ZvWU85zu.jpg",
    experienceRating: "Average",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "overrated"
  },
  {
    id: 22,
    title: "Brahmastra: Part One",
    year: 2022,
    director: "Ayan Mukerji",
    actors: ["Ranbir Kapoor", "Alia Bhatt", "Mouni Roy", "Amitabh Bachchan"],
    genres: ["Fantasy", "Action", "Adventure"],
    themes: ["Mythology", "Love", "Magic", "Heroes"],
    synopsis: "A DJ and a conservationist discover a magical weapon that leads them to a secret society.",
    poster: "https://image.tmdb.org/t/p/w500/mxJxyHoc8OqYK1f7YtbhRTLOl0k.jpg",
    experienceRating: "Timepass",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["Hindi", "Tamil", "Telugu"], aiSubtitles: ["English", "Tamil", "Telugu"], aiDubbing: ["Tamil", "Telugu"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 23,
    title: "Stree",
    year: 2018,
    director: "Amar Kaushik",
    actors: ["Rajkummar Rao", "Shraddha Kapoor", "Pankaj Tripathi", "Aparshakti Khurana"],
    genres: ["Comedy", "Horror"],
    themes: ["Ghost", "Comedy", "Town Legend", "Love"],
    synopsis: "A stylized reality of an Indian town where a female ghost visits only during a festival.",
    poster: "https://image.tmdb.org/t/p/w500/2xLDWr72Wxc1JGmbxza2V8g26YH.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 24,
    title: "Barfi!",
    year: 2012,
    director: "Anurag Basu",
    actors: ["Ranbir Kapoor", "Priyanka Chopra", "Ileana D'Cruz", "Saurabh Shukla"],
    genres: ["Comedy", "Drama", "Romance"],
    themes: ["Love", "Disability", "Heartbreak", "Happiness"],
    synopsis: "A deaf-mute boy falls in love with an autistic girl while another woman falls for him.",
    poster: "https://image.tmdb.org/t/p/w500/5cJIx2zKjDoUtPSliou23xsReb1.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 25,
    title: "Tiger Zinda Hai",
    year: 2017,
    director: "Ali Abbas Zafar",
    actors: ["Salman Khan", "Katrina Kaif", "Paresh Rawal", "Angad Bedi"],
    genres: ["Action", "Thriller"],
    themes: ["Terrorism", "Rescue", "Mission", "Heroism"],
    synopsis: "A special ops agent leads a dangerous mission to rescue hostages held by a terrorist group.",
    poster: "https://image.tmdb.org/t/p/w500/mdzNLFfCfuBoJz43l0SmMWWdu5t.jpg",
    experienceRating: "Timepass",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 26,
    title: "Maqbool",
    year: 2003,
    director: "Vishal Bhardwaj",
    actors: ["Irrfan Khan", "Tabu", "Pankaj Kapur", "Naseeruddin Shah"],
    genres: ["Crime", "Drama", "Thriller"],
    themes: ["Macbeth", "Power", "Ambition", "Betrayal"],
    synopsis: "A crime drama inspired by Shakespeare's Macbeth, set in Mumbai's underworld.",
    poster: "https://image.tmdb.org/t/p/w500/8ULTBxnbt0NrWlDm5fahbQooj91.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "MUBI", quality: "Full HD", audioLanguages: ["Hindi", "Urdu"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Netflix", quality: "HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 27,
    title: "Pushpa: The Rise",
    year: 2021,
    director: "Sukumar",
    actors: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil", "Sunil"],
    genres: ["Action", "Drama", "Crime"],
    themes: ["Smuggling", "Power", "Rise", "Revenge"],
    synopsis: "A laborer becomes a powerful figure in the red sanders smuggling business.",
    poster: "https://image.tmdb.org/t/p/w500/h6Pd89ngvl9quPVsx3KoJlQsvk9.jpg",
    experienceRating: "Timepass",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Telugu", "Hindi", "Tamil", "Malayalam"], aiSubtitles: ["English", "Hindi", "Tamil", "Malayalam"], aiDubbing: ["Hindi", "Tamil", "Malayalam"] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Telugu"], aiSubtitles: ["English", "Hindi"], aiDubbing: ["Hindi"] }
    ],
    category: "just-for-fun"
  },
  {
    id: 28,
    title: "Queen",
    year: 2014,
    director: "Vikas Bahl",
    actors: ["Kangana Ranaut", "Rajkummar Rao", "Lisa Haydon", "Mish Boyko"],
    genres: ["Comedy", "Drama"],
    themes: ["Self-Discovery", "Independence", "Travel", "Empowerment"],
    synopsis: "A girl goes on a solo honeymoon after her fiance calls off their wedding.",
    poster: "https://image.tmdb.org/t/p/w500/vKLp0X2RQOuA31R3AdaYtDdKIPK.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 29,
    title: "Housefull 4",
    year: 2019,
    director: "Farhad Samji",
    actors: ["Akshay Kumar", "Riteish Deshmukh", "Bobby Deol", "Kriti Sanon"],
    genres: ["Comedy"],
    themes: ["Reincarnation", "Comedy", "Family", "Love"],
    synopsis: "A modern reincarnation story about lovers from 1419 and 2019.",
    poster: "https://image.tmdb.org/t/p/w500/aCJOZzWV6cpZ9p9tmfEzXq4EqN8.jpg",
    experienceRating: "Average",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "just-for-fun"
  },
  {
    id: 30,
    title: "Tumbbad",
    year: 2018,
    director: "Rahi Anil Barve",
    actors: ["Sohum Shah", "Jyoti Malshe", "Mohammed Samad", "Ronjini Chakraborty"],
    genres: ["Horror", "Fantasy", "Drama"],
    themes: ["Mythology", "Greed", "Ancient Curse", "Gold"],
    synopsis: "A historical fantasy horror about a hidden treasure and the curse that surrounds it.",
    poster: "https://image.tmdb.org/t/p/w500/z1xOCxw780WFJC5uCTMfCkQ4Agi.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] },
      { platform: "Amazon Prime", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "underrated"
  },
  {
    id: 31,
    title: "The Lion King",
    year: 2019,
    director: "Jon Favreau",
    actors: ["Donald Glover", "Beyonce", "James Earl Jones", "Chiwetel Ejiofor"],
    genres: ["Animation", "Adventure", "Family"],
    themes: ["Family", "Responsibility", "Circle of Life", "Courage"],
    synopsis: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    poster: "https://image.tmdb.org/t/p/w500/dzBtMocZuJbjLOXvrl4zGYigDzh.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "Disney+", quality: "4K", audioLanguages: ["English", "Hindi", "Tamil"], aiSubtitles: ["English", "Hindi", "Tamil"], aiDubbing: ["Hindi", "Tamil"] }
    ],
    category: "just-for-fun"
  },
  {
    id: 32,
    title: "Bohemian Rhapsody",
    year: 2018,
    director: "Bryan Singer",
    actors: ["Rami Malek", "Lucy Boynton", "Gwilym Lee", "Ben Hardy"],
    genres: ["Biography", "Drama", "Music"],
    themes: ["Music", "Fame", "Identity", "Legacy"],
    synopsis: "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid.",
    poster: "https://image.tmdb.org/t/p/w500/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English"], aiSubtitles: ["English", "Hindi", "Spanish"], aiDubbing: ["Hindi"] }
    ],
    category: "must-watch"
  },
  {
    id: 33,
    title: "Coco",
    year: 2017,
    director: "Lee Unkrich",
    actors: ["Anthony Gonzalez", "Gael Garcia Bernal", "Benjamin Bratt", "Alanna Ubach"],
    genres: ["Animation", "Family", "Fantasy"],
    themes: ["Family", "Memory", "Music", "Culture"],
    synopsis: "A young boy accidentally enters the Land of the Dead and seeks the help of his deceased musician great-great-grandfather to return to his family.",
    poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Disney+", quality: "4K", audioLanguages: ["English", "Spanish", "Hindi"], aiSubtitles: ["English", "Hindi", "Tamil"], aiDubbing: ["Hindi", "Tamil"] }
    ],
    category: "must-watch"
  },
  {
    id: 34,
    title: "1917",
    year: 2019,
    director: "Sam Mendes",
    actors: ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Andrew Scott"],
    genres: ["War", "Drama", "Action"],
    themes: ["War", "Survival", "Duty", "Sacrifice"],
    synopsis: "Two British soldiers are given a seemingly impossible mission to deliver a message deep in enemy territory during World War I.",
    poster: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English"], aiSubtitles: ["English", "Hindi", "Spanish"], aiDubbing: ["Hindi"] }
    ],
    category: "must-watch"
  },
  {
    id: 35,
    title: "The Conjuring",
    year: 2013,
    director: "James Wan",
    actors: ["Patrick Wilson", "Vera Farmiga", "Lili Taylor", "Ron Livingston"],
    genres: ["Horror", "Mystery", "Thriller"],
    themes: ["Paranormal", "Evil", "Faith", "Family"],
    synopsis: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    experienceRating: "Go For It",
    streaming: [
      { platform: "HBO Max", quality: "Full HD", audioLanguages: ["English"], aiSubtitles: ["English", "Hindi"], aiDubbing: ["Hindi"] }
    ],
    category: "just-for-fun"
  },
  {
    id: 36,
    title: "The Revenant",
    year: 2015,
    director: "Alejandro Gonzalez Inarritu",
    actors: ["Leonardo DiCaprio", "Tom Hardy", "Domhnall Gleeson", "Will Poulter"],
    genres: ["Adventure", "Drama", "Western"],
    themes: ["Survival", "Revenge", "Nature", "Endurance"],
    synopsis: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead.",
    poster: "https://image.tmdb.org/t/p/w500/tSaBkriE7TpbjFoQUFXuikoz0dF.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English"], aiSubtitles: ["English", "Hindi", "Spanish"], aiDubbing: ["Hindi"] }
    ],
    category: "must-watch"
  },
  {
    id: 37,
    title: "Knives Out",
    year: 2019,
    director: "Rian Johnson",
    actors: ["Daniel Craig", "Ana de Armas", "Chris Evans", "Jamie Lee Curtis"],
    genres: ["Mystery", "Comedy", "Crime"],
    themes: ["Murder", "Investigation", "Family", "Deception"],
    synopsis: "A detective investigates the death of a patriarch of an eccentric, combative family.",
    poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "4K", audioLanguages: ["English"], aiSubtitles: ["English", "Hindi"], aiDubbing: ["Hindi"] }
    ],
    category: "must-watch"
  },
  {
    id: 38,
    title: "Zindagi Na Milegi Dobara",
    year: 2011,
    director: "Zoya Akhtar",
    actors: ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol", "Katrina Kaif"],
    genres: ["Drama", "Comedy", "Adventure"],
    themes: ["Friendship", "Life", "Travel", "Self-Discovery"],
    synopsis: "Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.",
    poster: "https://image.tmdb.org/t/p/w500/8dFRPHNaUHLHOM0BnYFHZsSQWRz.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 39,
    title: "Taare Zameen Par",
    year: 2007,
    director: "Aamir Khan",
    actors: ["Darsheel Safary", "Aamir Khan", "Tisca Chopra", "Vipin Sharma"],
    genres: ["Drama", "Family"],
    themes: ["Education", "Dyslexia", "Childhood", "Understanding"],
    synopsis: "An eight-year-old boy is thought to be lazy and a troublemaker until a new art teacher discovers he has dyslexia.",
    poster: "https://image.tmdb.org/t/p/w500/kCFbJ4D0fMlqRdUbXvVHmuCKRpI.jpg",
    experienceRating: "Masterpiece",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  },
  {
    id: 40,
    title: "Drishyam",
    year: 2015,
    director: "Nishikant Kamat",
    actors: ["Ajay Devgn", "Tabu", "Shriya Saran", "Rajat Kapoor"],
    genres: ["Thriller", "Crime", "Drama"],
    themes: ["Family", "Protection", "Deception", "Justice"],
    synopsis: "A man goes to extreme lengths to save his family from the consequences of a crime.",
    poster: "https://image.tmdb.org/t/p/w500/gIClWRv5OSe8rl5Koi0AeUcCZ9Z.jpg",
    experienceRating: "Absolute Cinema",
    streaming: [
      { platform: "Netflix", quality: "Full HD", audioLanguages: ["Hindi"], aiSubtitles: ["English"], aiDubbing: [] }
    ],
    category: "must-watch"
  }
];

// Experience rating mapping for display
const experienceRatings = {
  "Masterpiece": { label: "Masterpiece", color: "from-purple-600 to-pink-600", emoji: "👑" },
  "Absolute Cinema": { label: "Absolute Cinema", color: "from-yellow-500 to-orange-500", emoji: "🍿" },
  "Go For It": { label: "Go For It", color: "from-green-500 to-teal-500", emoji: "✅" },
  "Timepass": { label: "Timepass", color: "from-blue-500 to-cyan-500", emoji: "🎬" },
  "Average": { label: "Average", color: "from-gray-500 to-slate-500", emoji: "😐" },
  "Worst": { label: "Worst", color: "from-red-600 to-red-800", emoji: "💩" }
};

// Streaming platforms
const streamingPlatforms = [
  { id: 1, name: "Netflix", color: "bg-red-600" },
  { id: 2, name: "Amazon Prime", color: "bg-blue-600" },
  { id: 3, name: "Hotstar", color: "bg-purple-600" },
  { id: 4, name: "Disney+", color: "bg-blue-500" },
  { id: 5, name: "HBO Max", color: "bg-purple-700" },
  { id: 6, name: "SonyLIV", color: "bg-red-500" },
  { id: 7, name: "ZEE5", color: "bg-red-700" },
  { id: 8, name: "MUBI", color: "bg-black" },
  { id: 9, name: "Voot", color: "bg-purple-500" },
  { id: 10, name: "Apple TV+", color: "bg-gray-800" }
];

// Genres list
const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Drama", "Family", "Fantasy", "Horror", "Music", "Mystery",
  "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
];

// Languages
const languages = [
  "English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam",
  "Bengali", "Marathi", "Gujarati", "Punjabi", "Urdu", "Spanish", "French"
];

module.exports = { movies, experienceRatings, streamingPlatforms, genres, languages };
