let srcImg = {
	'Luke Skywalker': './img/LukeSkywalker.png',
	'C-3PO': './img/C-3PO.png',
	'R2-D2': './img/R2-D2.png',
	'Darth Vader': './img/DarthVader.png',
	'Leia Organa': './img/LeiaOrgana.png',
	'Owen Lars': './img/OwenLars.png',
	'Beru Whitesun lars': './img/BeruWhitesunlars.png',
	'R5-D4': './img/R5-D4.png',
	'Biggs Darklighter': './img/BiggsDarklighter.png',
	'Obi-Wan Kenobi': './img/Obi-WanKenobi.png',
	'Anakin Skywalker': './img/AnakinSkywalker.png',
	'Wilhuff Tarkin': './img/WilhuffTarkin.png',
	'Chewbacca': './img/Chewbacca.png',
	'Han Solo': './img/HanSolo.png',
	'Greedo': './img/Greedo.png',
	'Jabba Desilijic Tiure': './img/JabbaDesilijicTiure.png',
	'Wedge Antilles': './img/WedgeAntilles.png',
	'Jek Tono Porkins': './img/JekTonoPorkins.png',
	'Yoda': './img/Yoda.png',
	'Palpatine': './img/Palpatine.png',
	'Boba Fett': './img/BobaFett.png',
	'IG-88': './img/IG-88.png',
	'Bossk': './img/Bossk.png',
	'Lando Calrissian': './img/LandoCalrissian.png',
	'Lobot': './img/Lobot.png',
	'Ackbar': './img/Ackbar.png',
	'Mon Mothma': './img/MonMothma.png',
	'Arvel Crynyd': './img/ArvelCrynyd.png',
	'Wicket Systri Warrick': './img/WicketSystriWarrick.png',
	'Nien Nunb': './img/NienNunb.png',
	'Qui-Gon Jinn': './img/Qui-GonJinn.png',
	'Nute Gunray': './img/NuteGunray.png',
	'Finis Valorum': './img/FinisValorum.png',
	'Padmé Amidala': './img/PadméAmidala.png',
	'Jar Jar Binks': './img/JarJarBinks.png',
	'Roos Tarpals': './img/RoosTarpals.png',
	'Rugor Nass': './img/RugorNass.png',
	'Ric Olié': './img/RicOlié.png',
	'Watto': './img/Watto.png',
	'Sebulba': './img/Sebulba.png',
	'Quarsh Panaka': './img/QuarshPanaka.png',
	'Shmi Skywalker': './img/ShmiSkywalker.png',
	'Darth Maul': './img/DarthMaul.png',
	'Bib Fortuna': './img/BibFortuna.png',
	'Ayla Secura': './img/AylaSecura.png',
	'Ratts Tyerel': './img/RattsTyerel.png',
	'Dud Bolt': './img/DudBolt.png',
	'Gasgano': './img/Gasgano.png',
	'Ben Quadinaros': './img/BenQuadinaros.png',
	'Mace Windu': './img/MaceWindu.png',
	'Ki-Adi-Mundi': './img/Ki-Adi-Mundi.png',
	'Kit Fisto': './img/KitFisto.png',
	'Eeth Koth': './img/EethKoth.png',
	'Adi Gallia': './img/AdiGallia.png',
	'Saesee Tiin': './img/SaeseeTiin.png',
	'Yarael Poof': './img/YaraelPoof.png',
	'Plo Koon': './img/PloKoon.png',
	'Mas Amedda': './img/MasAmedda.png',
	'Gregar Typho': './img/GregarTypho.png',
	'Cordé': './img/Cordé.png',
	'Cliegg Lars': './img/ClieggLars.png',
	'Poggle the Lesser': './img/PoggletheLesser.png',
	'Luminara Unduli': './img/LuminaraUnduli.png',
	'Barriss Offee': './img/BarrissOffee.png',
	'Dormé': './img/Dormé.png',
	'Dooku': './img/Dooku.png',
	'Bail Prestor Organa': './img/BailPrestorOrgana.png',
	'Jango Fett': './img/JangoFett.png',
	'Zam Wesell': './img/ZamWesell.png',
	'Dexter Jettster': './img/DexterJettster.png',
	'Lama Su': './img/LamaSu.png',
	'Taun We': './img/TaunWe.png',
	'Jocasta Nu': './img/JocastaNu.png',
	'R4-P17': './img/R4-P17.png',
	'Wat Tambor': './img/WatTambor.png',
	'San Hill': './img/SanHill.png',
	'Shaak Ti': './img/ShaakTi.png',
	'Grievous': './img/Grievous.png',
	'Tarfful': './img/Tarfful.png',
	'Raymus Antilles': './img/RaymusAntilles.png',
	'Tion Medon': './img/TionMedon.png',
	'Sly Moore': './img/SlyMoore.png'
}

const request = async (url) => {
	const data = await fetch(url);
	return data.json();		
}

window.addEventListener('DOMContentLoaded', () =>{
	request('https://swapi.dev/api/people')
	.then( (data) => {
		show(data.results);
		document.querySelector('.my-spiner').style.display = "none";
	})
	.catch( (error) => {console.error(error)} );
})

function show (data) {
	data.forEach( (el)=>{
	
		const card = document.createElement('div');
		card.style.width = '18rem;';
		card.classList.add('card');

		const imgCard = document.createElement('img');
		imgCard.classList.add('card-img-top');
		imgCard.alt = 'img';
		imgCard.src =`${srcImg[el.name]}`;

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');

		const h5 = document.createElement('h5');
		h5.classList.add('card-title');
		h5.innerText = `${el.name}`;

		const h6 = document.createElement('h6');
		h6.classList.add('card-subtitle', 'mb-2', 'text-muted');
		h6.innerText = `gender: ${el.gender}`;

		const p = document.createElement('p');
		p.classList.add('card-text');
		const spiner = document.createElement('div');
		spiner.classList.add('spinner-border', 'text-primary', 'spinerHomeworld');
		spiner.role = 'status';		
		p.append(spiner);

		request(el.homeworld)
		.then( (homeworld) =>{			
			let objHomeworld = homeworld;
			document.querySelector('.spinerHomeworld').style.display = "none";

			p.innerText = `Homeworld: ${objHomeworld.name}
			Climate: ${objHomeworld.climate}
			Population: ${objHomeworld.population}
			Surface water: ${objHomeworld.surface_water}
			Orbital period: ${objHomeworld.orbital_period}` 
		})
		.catch( (error) => {console.error(error)} );

		const linkFilms = document.createElement('a');		
		linkFilms.classList.add('btn', 'btn-primary');
		linkFilms.innerText = 'Films';

		const pFilms = document.createElement('p');
		pFilms.classList.add('p-films');
		pFilms.style.display = 'none';

		let text = '';
		el.films.forEach( (e) => {
			request(e)
			.then( (films) =>{
				let objFilms = films;
				//console.log('films: ' + objFilms.title)
				text += `Film: ${objFilms.title}
				Episode: ${objFilms.episode_id}\r\n`;
				pFilms.innerText = text;
			})
			.catch( (error) => {console.error(error)} );
		})

		let flagFilms = false;
		linkFilms.addEventListener('click', (e) => {
			if (flagFilms === false) {				
				pFilms.style.display = 'block';
				flagFilms = true;			
			} else if( flagFilms === true) {				
				pFilms.style.display = 'none';
				flagFilms = false;				
			}			
		})

		document.querySelector('.cards').append(card);
		card.append(imgCard);
		card.append(cardBody);
		cardBody.append(h5);
		cardBody.append(h6);
		cardBody.append(p);
		cardBody.append(linkFilms);	
		linkFilms.append(pFilms);	

	})
}

window.addEventListener("DOMContentLoaded",()=>{
	const btn = document.querySelector(".chenge");	

	btn.addEventListener('click', (e) => {		
		document.querySelector('.cards').innerHTML = '';
		document.querySelector('.my-spiner').style.display = "block";
		let links = document.querySelectorAll('.page-link');
		links.forEach((el) => el.classList.remove('active') );
		e.target.classList.add('active')
		let key = e.target.value;

		request(`https://swapi.dev/api/people/?page=${key}`)
		.then( (data) =>{
			show(data.results);
			document.querySelector('.my-spiner').style.display = "none";
		})
		.catch( (error) => {console.error(error)} );
	})	
})