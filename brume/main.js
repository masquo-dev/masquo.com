/*
  BRUME · boutique de démonstration (marque fictive) réalisée par Masquo.
  Version « prisme » : image du flacon et du décor créée par IA (ChatGPT), rendue vivante ici :
  le flacon découpé flotte, le soleil tourne, les cascades coulent, des pétales volent, la lumière du cristal suit la
  souris, le prénom se grave en direct dans le cristal. « Acheter le parfum de vos rêves » : le flacon gravé s'envole
  vers un panier qui continue le décor ; version de démonstration : aucun paiement n'est demandé.
  Plus tout ce qu'une boutique doit afficher : prix TTC et au litre, composition, précautions, livraison et retours,
  avis marqués « exemple », FAQ, pages légales d'exemple, choix des cookies.
*/
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* bloqué */ } } };

/* ---------------- textes ---------------- */
const T = {
  en: {
    title: 'BRUME · A fragrance with their name', skip: 'Skip to the shop', 'nav.left': 'of 1,000 bottles left',
    'm.notes': 'The notes', 'm.flacon': 'The bottle', 'm.avis': 'Reviews', 'm.ship': 'Delivery', 'm.faq': 'FAQ',
    eyebrow: 'Eau de parfum · Limited edition', title1: 'A fragrance', title2: 'with their name.',
    lead: 'A crystal cut like a diamond, a rose and gold perfume. Type a name: it is engraved on the bottle, live.',
    'field.label': 'Name to engrave', 'style.script': 'Handwritten', 'style.caps': 'Capitals',
    ppl: (p) => `incl. VAT · ${p} / L`, buy: 'Buy the perfume of your dreams', 'card.trust': 'Free delivery · gift box · secure payment',
    how1: 'Type a name', how2: 'It is engraved in the crystal', how3: 'Pay in one tap', how4: 'Gift box, delivered in 48 h',
    'notes.kicker': 'The perfume', 'notes.title': 'What it smells like.',
    'n1.when': 'The first minute', 'n1.name': 'Lychee & hibiscus', 'n1.txt': 'The pink at the top of the bottle: bright, juicy, almost sparkling.',
    'n2.when': 'After ten minutes', 'n2.name': 'Mango & orange blossom', 'n2.txt': 'The orange in the middle: sunny, creamy, like the end of the afternoon.',
    'n3.when': 'Until the evening', 'n3.name': 'Golden amber & sandalwood', 'n3.txt': 'The gold at the bottom: warm, soft, it stays on the skin.',
    'flacon.kicker': 'The bottle', 'flacon.title': 'A crystal cut like a diamond.', 'flacon.alt': 'The crystal bottle cut like a diamond, with its gold cap',
    'flacon.lead': 'Each facet catches the light and throws small rainbows. The cap is polished gold. The name is engraved by laser, the same day.',
    's1.k': 'Concentration', 's1.v': 'Eau de parfum, 18 %', 's2.k': 'Fragrance family', 's2.v': 'Floral, fruity, amber', 's3.k': 'Lasts', 's3.v': '8 to 10 hours',
    's4.k': 'Sizes', 's5.k': 'Engraving', 's5.v': 'Handwritten or capitals, 12 letters', 's6.k': 'Made in', 's6.v': 'Grasse, France (fictional brand)',
    'acc1.t': 'Ingredients', 'acc1.b': '<p>Alcohol denat., Parfum (Fragrance), Aqua (Water), <b>Limonene</b>, <b>Linalool</b>, <b>Citral</b>, <b>Geraniol</b>, <b>Coumarin</b>, <b>Benzyl Salicylate</b>.</p><p>In bold: the allergens that must be listed. Sample list: fictional brand.</p>',
    'acc2.t': 'Precautions', 'acc2.b': '<p>Flammable liquid and vapour. Keep away from heat, sparks and flames. Keep out of reach of children. For external use only. Avoid contact with the eyes. Do not spray on irritated skin.</p>',
    'acc3.t': 'How to wear it', 'acc3.b': '<p>Spray from 15 cm on the wrists and neck, without rubbing. Keep the bottle away from direct sunlight and heat.</p>',
    'g1.t': 'Free delivery', 'g1.s': 'Tracked, in 48 h', 'g2.t': 'Gift box included', 'g2.s': 'With a note if you wish',
    'g3.t': 'Secure payment', 'g3.s': 'Google Pay, Apple Pay, card', 'g4.t': 'Breakage replaced', 'g4.s': 'Damaged on arrival: a new one, free',
    'avis.kicker': 'Reviews', 'avis.title': 'They gave it as a gift.', 'avis.score': '4.8 out of 5', 'avis.tag': 'Sample reviews',
    'r1.t': '“A gift for my sister, with her name engraved: she cried when she opened the box. The mango is sublime.”', 'r1.a': 'Camille R.',
    'r2.t': '“In the sun, the bottle throws little rainbows across the table. Everyone asks where it comes from.”', 'r2.a': 'Inès M.',
    'r3.t': '“Ordered on Monday, received on Wednesday. The engraving is fine and sharp. It lasts all day.”', 'r3.a': 'Thomas L.',
    'avis.note': 'Sample reviews: this is a demo shop, these reviews are not real.',
    'ship.kicker': 'Delivery & returns', 'ship.title': 'Engraved today, at your door in 48 h.',
    'sh1.t': 'Delivery', 'sh1.b': 'Standard in 48 h: free. Express in 24 h: €9.90. Tracking by email. Engraving done the same day for orders before 2 pm.',
    'sh2.t': 'Returns', 'sh2.b': 'An engraved bottle is made for one person: it cannot be returned (personalised goods, EU consumer law). Without engraving: 14 days to change your mind.',
    'sh3.t': 'Breakage or defect', 'sh3.b': 'Damaged on arrival or faulty: we replace it free of charge. Legal guarantee of conformity: 2 years.',
    'faq.kicker': 'Questions', 'faq.title': 'Everything you want to know.',
    q1: 'How many letters can be engraved?', a1: 'Up to 12, accents, hyphen and apostrophe included. Handwritten or capitals: you see the result live on the bottle.',
    q2: 'When will I receive my order?', a2: 'The engraving is done the same day for any order before 2 pm. Delivery in 48 h (free) or 24 h (express, €9.90).',
    q3: 'Can I add a note?', a3: 'Yes, in the bag: a short message printed on a card slipped into the gift box.',
    q4: 'How long does it last on the skin?', a4: 'It is an eau de parfum: 8 to 10 hours on the skin, longer on clothes.',
    q5: 'Can I return an engraved bottle?', a5: 'No, it is a personalised product. But if it arrives damaged, we replace it.',
    q6: 'Is payment secure?', a6: 'Yes: Google Pay and Apple Pay never share your card number with the shop. Here, demo shop: nothing is charged.',
    'nl.title': 'Get 10% off your first bottle.', 'nl.lead': 'One letter a month, no more. Unsubscribe in one click.', 'nl.ph': 'Your email', 'nl.btn': 'Sign up',
    'nl.legal': 'By signing up you accept our <a href="#" data-legal="privacy">privacy policy</a>.', 'nl.ok': 'Thank you! (Demo: no email is stored.)', 'nl.bad': 'Please check your email address.',
    'f.tag': 'A fragrance, with their name.', 'f.shop': 'Shop', 'f.l1': 'The perfume', 'f.help': 'Help', 'f.returns': 'Returns', 'f.contact': 'Contact',
    'f.legal': 'Legal', 'f.mentions': 'Legal notice', 'f.cgv': 'Terms of sale', 'f.privacy': 'Privacy', 'f.cookies': 'Cookies',
    'f.pay': 'Payment', 'f.paytxt': 'Google Pay · Apple Pay · Bank card', 'f.vat': 'Prices in euros, VAT included.', 'f.follow': 'Follow us',
    foot: 'BRUME is a fictional brand and this is a demo shop: no payment is requested and nothing is charged. Bottle, ingredients and scenery images created with AI. Designed by <a href="https://masquo.com">Masquo</a>, websites that sell. IP address, approximate location (country, region, city), internet provider, page visited, source, browser and language are kept for 30 days, for security and statistics.',
    sticky: 'Buy', 'cart.title': 'Your prism awaits.', 'cart.close': 'Close', 'cart.empty': 'Your bag is empty.', 'cart.back': 'Choose a name',
    'msg.label': 'A note in the gift box (optional)', 'msg.ph': 'Happy birthday, my Sarah…', 'ship.legend': 'Delivery', 'ship.std': 'Standard 48 h', 'ship.free': 'Free', 'ship.exp': 'Express 24 h',
    'cart.gift': 'Gift box and a 2 ml sample included', 'sum.sub': 'Subtotal', 'sum.ship': 'Delivery', 'sum.total': 'Total incl. VAT',
    'pay.express': 'Pay in one tap', 'pay.fallback': 'Pay now', 'pay.card': 'Pay by bank card', 'pay.note': 'Demo shop: no payment is requested, nothing is charged.',
    'pay.cgv': 'By paying you accept our <a href="#" data-legal="cgv">terms of sale</a>. Engraved bottle: personalised product, no right of withdrawal.',
    'pay.cardtoast': 'Demo shop: card payment would open here with a secure payment provider.',
    line: (ml) => `BRUME · Eau de parfum ${ml} ml`, engraved: (n) => `Engraved <b>${n}</b> · n° 0348`, noengrave: 'No engraving', remove: 'Remove',
    gline: (ml, n) => `BRUME ${ml} ml${n ? ` · engraved “${n}”` : ''}`, gship: 'Delivery', merchant: 'BRUME (demo shop)', num: 'N°',
    'done.eyebrow': 'Demo order · nothing charged', 'done.title': 'Bottle n°', 'done.text': 'Engraved today, in its gift box tomorrow. Demo shop: nothing was charged.', 'done.close': 'Back to the store',
    'toast.error': 'The payment window could not open. Demo shop: nothing was charged.', 'toast.added': 'Added to your bag',
    'ck.text': 'We use the cookies needed for the bag and the language. With your consent we would also measure visits (demo: no measuring cookie is set).',
    'ck.refuse': 'Refuse', 'ck.accept': 'Accept', 'ck.more': 'Learn more', 'legal.demo': 'Sample document: demo shop, fictional company.',
  },
  fr: {
    title: 'BRUME · Un parfum à son nom', skip: 'Aller à la boutique', 'nav.left': 'flacons restants sur 1 000',
    'm.notes': 'Les notes', 'm.flacon': 'Le flacon', 'm.avis': 'Avis', 'm.ship': 'Livraison', 'm.faq': 'Questions',
    eyebrow: 'Eau de parfum · Édition limitée', title1: 'Un parfum', title2: 'à son nom.',
    lead: 'Un cristal taillé comme un diamant, un parfum rose et or. Tapez un prénom : il se grave sur le flacon, en direct.',
    'field.label': 'Prénom à graver', 'style.script': 'Manuscrit', 'style.caps': 'Majuscules',
    ppl: (p) => `TTC · ${p} le litre`, buy: 'Acheter le parfum de vos rêves', 'card.trust': 'Livraison offerte · coffret cadeau · paiement sécurisé',
    how1: 'Tapez un prénom', how2: 'Il est gravé dans le cristal', how3: 'Payez en un geste', how4: 'Coffret cadeau, livré en 48 h',
    'notes.kicker': 'Le parfum', 'notes.title': 'Ce qu’il sent.',
    'n1.when': 'La première minute', 'n1.name': 'Litchi et hibiscus', 'n1.txt': 'Le rose en haut du flacon : vif, juteux, presque pétillant.',
    'n2.when': 'Après dix minutes', 'n2.name': 'Mangue et fleur d’oranger', 'n2.txt': 'L’orange au milieu : solaire, crémeux, comme une fin d’après-midi.',
    'n3.when': 'Jusqu’au soir', 'n3.name': 'Ambre doré et bois de santal', 'n3.txt': 'L’or au fond : chaud, doux, il reste sur la peau.',
    'flacon.kicker': 'Le flacon', 'flacon.title': 'Un cristal taillé comme un diamant.', 'flacon.alt': 'Le flacon en cristal taillé comme un diamant, avec son bouchon doré',
    'flacon.lead': 'Chaque facette attrape la lumière et projette de petits arcs-en-ciel. Le bouchon est en métal doré poli. Le prénom est gravé au laser, le jour même.',
    's1.k': 'Concentration', 's1.v': 'Eau de parfum, 18 %', 's2.k': 'Famille olfactive', 's2.v': 'Florale, fruitée, ambrée', 's3.k': 'Tenue', 's3.v': '8 à 10 heures',
    's4.k': 'Contenances', 's5.k': 'Gravure', 's5.v': 'Manuscrit ou majuscules, 12 lettres', 's6.k': 'Fabrication', 's6.v': 'Grasse, France (marque fictive)',
    'acc1.t': 'Composition', 'acc1.b': '<p>Alcohol denat., Parfum (Fragrance), Aqua (Water), <b>Limonene</b>, <b>Linalool</b>, <b>Citral</b>, <b>Geraniol</b>, <b>Coumarin</b>, <b>Benzyl Salicylate</b>.</p><p>En gras : les allergènes à signaler. Liste d’exemple : marque fictive.</p>',
    'acc2.t': 'Précautions d’emploi', 'acc2.b': '<p>Liquide et vapeurs inflammables. Tenir à l’écart de la chaleur, des étincelles et des flammes. Tenir hors de portée des enfants. Usage externe uniquement. Éviter le contact avec les yeux. Ne pas vaporiser sur une peau irritée.</p>',
    'acc3.t': 'Conseils d’utilisation', 'acc3.b': '<p>Vaporisez à 15 cm sur les poignets et le cou, sans frotter. Conservez le flacon à l’abri du soleil et de la chaleur.</p>',
    'g1.t': 'Livraison offerte', 'g1.s': 'Suivie, en 48 h', 'g2.t': 'Coffret cadeau offert', 'g2.s': 'Avec un mot si vous le voulez',
    'g3.t': 'Paiement sécurisé', 'g3.s': 'Google Pay, Apple Pay, carte', 'g4.t': 'Casse remplacée', 'g4.s': 'Abîmé à l’arrivée : un neuf, gratuit',
    'avis.kicker': 'Avis', 'avis.title': 'Ils l’ont offert.', 'avis.score': '4,8 sur 5', 'avis.tag': 'Avis d’exemple',
    'r1.t': '« Offert à ma sœur avec son prénom gravé : elle a pleuré en ouvrant le coffret. La mangue est sublime. »', 'r1.a': 'Camille R.',
    'r2.t': '« Au soleil, le flacon projette des petits arcs-en-ciel sur la table. Tout le monde me demande d’où il vient. »', 'r2.a': 'Inès M.',
    'r3.t': '« Commandé le lundi, reçu le mercredi. La gravure est fine et nette. Il tient toute la journée. »', 'r3.a': 'Thomas L.',
    'avis.note': 'Avis d’exemple : ceci est une boutique de démonstration, ces avis ne sont pas réels.',
    'ship.kicker': 'Livraison et retours', 'ship.title': 'Gravé aujourd’hui, chez vous en 48 h.',
    'sh1.t': 'Livraison', 'sh1.b': 'Standard en 48 h : offerte. Express en 24 h : 9,90 €. Suivi par e-mail. Gravure faite le jour même pour toute commande avant 14 h.',
    'sh2.t': 'Retours', 'sh2.b': 'Un flacon gravé est fait pour une seule personne : il ne peut pas être retourné (produit personnalisé, article L221-28 du Code de la consommation). Sans gravure : 14 jours pour changer d’avis.',
    'sh3.t': 'Casse ou défaut', 'sh3.b': 'Abîmé à l’arrivée ou défectueux : nous le remplaçons gratuitement. Garantie légale de conformité : 2 ans.',
    'faq.kicker': 'Questions', 'faq.title': 'Tout ce que vous voulez savoir.',
    q1: 'Combien de lettres peut-on graver ?', a1: 'Jusqu’à 12, accents, trait d’union et apostrophe compris. Manuscrit ou majuscules : vous voyez le résultat en direct sur le flacon.',
    q2: 'Quand vais-je recevoir ma commande ?', a2: 'La gravure est faite le jour même pour toute commande avant 14 h. Livraison en 48 h (offerte) ou en 24 h (express, 9,90 €).',
    q3: 'Puis-je ajouter un mot ?', a3: 'Oui, dans le panier : un petit message imprimé sur une carte glissée dans le coffret.',
    q4: 'Combien de temps tient-il sur la peau ?', a4: 'C’est une eau de parfum : 8 à 10 heures sur la peau, plus longtemps sur les vêtements.',
    q5: 'Puis-je retourner un flacon gravé ?', a5: 'Non, c’est un produit personnalisé. Mais s’il arrive abîmé, nous le remplaçons.',
    q6: 'Le paiement est-il sécurisé ?', a6: 'Oui : Google Pay et Apple Pay ne transmettent jamais votre numéro de carte à la boutique. Ici, boutique de démonstration : rien n’est débité.',
    'nl.title': 'Recevez −10 % sur votre premier flacon.', 'nl.lead': 'Une lettre par mois, pas plus. Désinscription en un clic.', 'nl.ph': 'Votre e-mail', 'nl.btn': 'Je m’inscris',
    'nl.legal': 'En vous inscrivant, vous acceptez notre <a href="#" data-legal="privacy">politique de confidentialité</a>.', 'nl.ok': 'Merci ! (Démonstration : aucun e-mail n’est enregistré.)', 'nl.bad': 'Vérifiez votre adresse e-mail.',
    'f.tag': 'Un parfum, à son nom.', 'f.shop': 'Boutique', 'f.l1': 'Le parfum', 'f.help': 'Aide', 'f.returns': 'Retours', 'f.contact': 'Contact',
    'f.legal': 'Informations légales', 'f.mentions': 'Mentions légales', 'f.cgv': 'Conditions générales de vente', 'f.privacy': 'Confidentialité', 'f.cookies': 'Cookies',
    'f.pay': 'Paiement', 'f.paytxt': 'Google Pay · Apple Pay · Carte bancaire', 'f.vat': 'Prix en euros, TTC.', 'f.follow': 'Suivez-nous',
    foot: 'BRUME est une marque fictive et ceci est une boutique de démonstration : aucun paiement n’est demandé et rien n’est débité. Images du flacon, des ingrédients et du décor créées par IA. Réalisée par <a href="https://masquo.com">Masquo</a>, des sites qui vendent. Adresse IP, lieu approximatif (pays, région, ville), opérateur, page visitée, provenance, navigateur et langue enregistrés 30 jours, pour la sécurité et les statistiques.',
    sticky: 'Acheter', 'cart.title': 'Votre prisme vous attend.', 'cart.close': 'Fermer', 'cart.empty': 'Votre panier est vide.', 'cart.back': 'Choisir un prénom',
    'msg.label': 'Un mot dans le coffret (facultatif)', 'msg.ph': 'Joyeux anniversaire, ma Sarah…', 'ship.legend': 'Livraison', 'ship.std': 'Standard 48 h', 'ship.free': 'Offerte', 'ship.exp': 'Express 24 h',
    'cart.gift': 'Coffret cadeau et échantillon de 2 ml offerts', 'sum.sub': 'Sous-total', 'sum.ship': 'Livraison', 'sum.total': 'Total TTC',
    'pay.express': 'Payer en un geste', 'pay.fallback': 'Payer', 'pay.card': 'Payer par carte bancaire', 'pay.note': 'Boutique de démonstration : aucun paiement n’est demandé, rien n’est débité.',
    'pay.cgv': 'En payant, vous acceptez nos <a href="#" data-legal="cgv">conditions générales de vente</a>. Flacon gravé : produit personnalisé, sans droit de rétractation.',
    'pay.cardtoast': 'Boutique de démonstration : le paiement par carte s’ouvrirait ici chez un prestataire de paiement sécurisé.',
    line: (ml) => `BRUME · Eau de parfum ${ml} ml`, engraved: (n) => `Gravé <b>${n}</b> · n° 0348`, noengrave: 'Sans gravure', remove: 'Retirer',
    gline: (ml, n) => `BRUME ${ml} ml${n ? ` · gravé « ${n} »` : ''}`, gship: 'Livraison', merchant: 'BRUME (boutique de démonstration)', num: 'N°',
    'done.eyebrow': 'Commande de démonstration · rien n’est débité', 'done.title': 'Flacon n°', 'done.text': 'Gravé aujourd’hui, dans son coffret demain. Boutique de démonstration : rien n’a été débité.', 'done.close': 'Revenir à la boutique',
    'toast.error': 'La fenêtre de paiement n’a pas pu s’ouvrir. Boutique de démonstration : rien n’a été débité.', 'toast.added': 'Ajouté à votre panier',
    'ck.text': 'Nous utilisons les cookies nécessaires au panier et à la langue. Avec votre accord, nous mesurerions aussi les visites (démonstration : aucun cookie de mesure n’est déposé).',
    'ck.refuse': 'Refuser', 'ck.accept': 'Accepter', 'ck.more': 'En savoir plus', 'legal.demo': 'Document d’exemple : boutique de démonstration, société fictive.',
  },
};

/* pages légales d'exemple (société fictive) */
const LEGAL = {
  fr: {
    mentions: ['Mentions légales', '<h3>Éditeur</h3><p>BRUME SAS (société fictive), capital de 10 000 €, 12 rue des Parfumeurs, 06130 Grasse, France. RCS Grasse 000 000 000 (exemple). Directrice de la publication : la présidente de BRUME SAS.</p><h3>Hébergement</h3><p>Hébergeur à indiquer (nom, adresse, téléphone).</p><h3>Contact</h3><p>bonjour@brume.example · 01 23 45 67 89 (exemple)</p><h3>Création</h3><p>Site réalisé par Masquo. Images créées par IA.</p>'],
    cgv: ['Conditions générales de vente', '<h3>1. Prix</h3><p>Les prix sont en euros, toutes taxes comprises (TTC). Le prix au litre est indiqué à côté de chaque contenance.</p><h3>2. Commande</h3><p>La commande est ferme après le paiement. Un e-mail de confirmation récapitule le prénom gravé, la contenance et le prix.</p><h3>3. Paiement</h3><p>Google Pay, Apple Pay ou carte bancaire, par un prestataire sécurisé. Aucun numéro de carte n’est conservé par la boutique.</p><h3>4. Livraison</h3><p>France métropolitaine : standard 48 h offerte, express 24 h à 9,90 €.</p><h3>5. Droit de rétractation</h3><p>Il ne s’applique pas aux produits personnalisés, donc aux flacons gravés (article L221-28 3° du Code de la consommation). Flacon sans gravure : 14 jours à compter de la réception.</p><h3>6. Garanties</h3><p>Garantie légale de conformité (2 ans) et garantie des vices cachés. Un flacon abîmé à l’arrivée est remplacé gratuitement.</p><h3>7. Litiges</h3><p>En cas de litige, vous pouvez recourir gratuitement à un médiateur de la consommation (coordonnées à indiquer).</p>'],
    privacy: ['Politique de confidentialité', '<h3>Données collectées</h3><p>Pour une commande : nom, adresse de livraison, e-mail, prénom à graver, message du coffret. Pour la lettre : e-mail.</p><h3>Pourquoi</h3><p>Préparer et livrer la commande, envoyer la lettre si vous l’avez demandée.</p><h3>Durée</h3><p>Commandes : 3 ans après le dernier achat (10 ans pour les factures). Lettre : jusqu’à la désinscription.</p><h3>Vos droits</h3><p>Accès, rectification, effacement, opposition, portabilité : écrivez à donnees@brume.example (exemple). Vous pouvez aussi saisir la CNIL.</p><h3>Paiement</h3><p>Les données de carte sont traitées par Google Pay, Apple Pay ou le prestataire de paiement, jamais par la boutique.</p>'],
    cookies: ['Cookies', '<p>Cookies nécessaires (sans accord) : le contenu du panier, la langue choisie, votre choix sur les cookies.</p><p>Mesure d’audience (seulement avec votre accord) : aucune dans cette démonstration.</p><p>Vous pouvez changer d’avis à tout moment : <a href="#" data-ck-reset>revoir mon choix</a>.</p>'],
    contact: ['Contact', '<p>Une question sur une gravure, une commande ou un cadeau ?</p><p>E-mail : bonjour@brume.example<br>Téléphone : 01 23 45 67 89, du lundi au vendredi, de 9 h à 18 h (exemple).</p>'],
  },
  en: {
    mentions: ['Legal notice', '<h3>Publisher</h3><p>BRUME SAS (fictional company), share capital €10,000, 12 rue des Parfumeurs, 06130 Grasse, France. Trade register Grasse 000 000 000 (sample).</p><h3>Hosting</h3><p>Host to be stated (name, address, phone).</p><h3>Contact</h3><p>hello@brume.example · +33 1 23 45 67 89 (sample)</p><h3>Design</h3><p>Website by Masquo. Images created with AI.</p>'],
    cgv: ['Terms of sale', '<h3>1. Prices</h3><p>Prices are in euros, VAT included. The price per litre is shown next to each size.</p><h3>2. Order</h3><p>The order is final once paid. A confirmation email sums up the engraved name, the size and the price.</p><h3>3. Payment</h3><p>Google Pay, Apple Pay or bank card, through a secure provider. The shop never stores card numbers.</p><h3>4. Delivery</h3><p>Standard 48 h free, express 24 h €9.90.</p><h3>5. Right of withdrawal</h3><p>It does not apply to personalised goods, so not to engraved bottles. Bottle without engraving: 14 days from delivery.</p><h3>6. Guarantees</h3><p>Legal guarantee of conformity (2 years). A bottle damaged on arrival is replaced free of charge.</p><h3>7. Disputes</h3><p>You can use a consumer mediator free of charge (details to be stated).</p>'],
    privacy: ['Privacy policy', '<h3>Data collected</h3><p>For an order: name, delivery address, email, name to engrave, gift note. For the newsletter: email.</p><h3>Why</h3><p>To prepare and deliver your order, and send the newsletter if you asked for it.</p><h3>How long</h3><p>Orders: 3 years after the last purchase (10 years for invoices). Newsletter: until you unsubscribe.</p><h3>Your rights</h3><p>Access, correction, deletion, objection, portability: write to data@brume.example (sample).</p><h3>Payment</h3><p>Card data is handled by Google Pay, Apple Pay or the payment provider, never by the shop.</p>'],
    cookies: ['Cookies', '<p>Necessary cookies (no consent needed): your bag, your language, your cookie choice.</p><p>Audience measurement (only with your consent): none in this demo.</p><p>You can change your mind at any time: <a href="#" data-ck-reset>review my choice</a>.</p>'],
    contact: ['Contact', '<p>A question about an engraving, an order or a gift?</p><p>Email: hello@brume.example<br>Phone: +33 1 23 45 67 89, Monday to Friday, 9 am to 6 pm (sample).</p>'],
  },
};

let LANG = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'fr' || q === 'en') return q;
  const s = store.get('brume-lang'); if (s === 'fr' || s === 'en') return s;
  return (navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
})();
const D = () => T[LANG];
const money = (v) => new Intl.NumberFormat(LANG === 'fr' ? 'fr-FR' : 'en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(v).replace(/ /g, ' ');
const SIZES = [{ ml: 50, price: 89 }, { ml: 100, price: 129 }];
const SHIP = { std: 0, exp: 9.9 };
const EDITION = { total: 1000, left: 652 };
const NUM = String(EDITION.total - EDITION.left).padStart(4, '0'); // le prochain flacon de l'édition
const STATE = { name: 'Sarah', style: 'script', size: 0, ship: 'std' };
let CART = (() => { try { const c = JSON.parse(store.get('brume-cart') || '[]'); return Array.isArray(c) ? c.filter((l) => l && SIZES[l.size] && l.qty > 0).slice(0, 10) : []; } catch (e) { return []; } })();
const saveCart = () => store.set('brume-cart', JSON.stringify(CART));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- cadrage : le flacon toujours en entier, à côté de la carte ----------------
   Image source 1672 × 941 ; le flacon y occupe le rectangle 530,126 → 1133,769. */
const IMG = { w: 1672, h: 941 }, BOT = { x0: 530, y0: 126, x1: 1133, y1: 769 };
const view = $('#view'), scene = $('#scene'), card = $('#card');
const mobile = () => innerWidth <= 900;
const CAM = { s: 1, tx: 0, ty: 0 };
function layout() {
  const W = view.clientWidth, H = view.clientHeight;
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navh')) || 64;
  let fx0, fx1, fy0, fy1; // zone libre pour le flacon
  if (mobile()) { fx0 = 10; fx1 = W - 10; fy0 = nav + 6; fy1 = H - 62; }
  else { const cr = card.getBoundingClientRect(); fx0 = cr.right + 28; fx1 = W - 24; fy0 = nav + 10; fy1 = H - 14; }
  const bw = BOT.x1 - BOT.x0, bh = (BOT.y1 - BOT.y0) * 1.04;
  const fit = Math.min((fx1 - fx0) / (bw * 1.08), (fy1 - fy0) / bh);
  let s = Math.min(fit, 1.3);
  s = Math.max(s, H / IMG.h);
  if (mobile()) s = Math.max(s, W / IMG.w);
  const cx = (fx0 + fx1) / 2, cy = (fy0 + fy1) / 2;
  let tx = cx - ((BOT.x0 + BOT.x1) / 2) * s, ty = cy - ((BOT.y0 + BOT.y1) / 2 + 8) * s;
  ty = clamp(ty, H - IMG.h * s, 0);
  if (mobile()) tx = clamp(tx, W - IMG.w * s, 0);
  else tx = clamp(tx, W - IMG.w * s, Math.max(0, card.getBoundingClientRect().right * 0.85));
  CAM.s = s; CAM.tx = tx; CAM.ty = ty;
  applyCam(PAR.x, PAR.y);
}
function applyCam(px, py) { scene.style.transform = `translate3d(${(CAM.tx + px).toFixed(2)}px, ${(CAM.ty + py).toFixed(2)}px, 0) scale(${CAM.s.toFixed(5)})`; }

/* ---------------- vie du décor : parallaxe, lumière du cristal ---------------- */
const light = $('#light');
const PAR = { x: 0, y: 0, tx: 0, ty: 0 };
function bindPointer() {
  if (REDUCED) return;
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = view.getBoundingClientRect();
    if (e.clientY > r.bottom) return;
    PAR.tx = (e.clientX / innerWidth - 0.5) * -14;
    PAR.ty = (e.clientY / innerHeight - 0.5) * -8;
    const b = $('#bottle').getBoundingClientRect();
    light.style.setProperty('--lx', `${clamp((e.clientX - b.left) / b.width * 100, -20, 120).toFixed(1)}%`);
    light.style.setProperty('--ly', `${clamp((e.clientY - b.top) / b.height * 100, -20, 120).toFixed(1)}%`);
  }, { passive: true });
  const tick = () => {
    PAR.x += (PAR.tx - PAR.x) * 0.06; PAR.y += (PAR.ty - PAR.y) * 0.06;
    if (Math.abs(PAR.tx - PAR.x) > 0.02 || Math.abs(PAR.ty - PAR.y) > 0.02) applyCam(PAR.x, PAR.y);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* étincelles sur les arêtes du cristal (positions relevées sur l'image, en px du flacon 603 × 643) */
const GLINTS = [[82, 311], [170, 232], [470, 234], [590, 309], [375, 434], [240, 529], [120, 474], [460, 574], [330, 269], [30, 344], [530, 394], [200, 619], [310, 44], [400, 174]];
function makeGlints() {
  const box = $('#glints');
  GLINTS.forEach(([x, y], i) => {
    const g = document.createElement('i');
    g.className = 'glint';
    g.style.left = `${(x / 603 * 100).toFixed(2)}%`; g.style.top = `${(y / 643 * 100).toFixed(2)}%`;
    g.style.animationDelay = `${(-(i * 1.37) % 3.6).toFixed(2)}s`;
    g.style.animationDuration = `${(3.2 + (i % 4) * 0.45).toFixed(2)}s`;
    box.appendChild(g);
  });
}
function makePetals() {
  if (REDUCED) return;
  const box = $('#petals');
  const n = mobile() ? 7 : 12;
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.className = 'petal' + (i % 3 === 2 ? ' petal--o' : '');
    p.style.left = `${(4 + (i * 83) % 92)}%`;
    const sc = 0.6 + ((i * 37) % 10) / 14;
    p.style.width = `${(18 * sc).toFixed(1)}px`; p.style.height = `${(13 * sc).toFixed(1)}px`;
    p.style.setProperty('--d', `${(11 + (i * 7) % 9).toFixed(1)}s`);
    p.style.setProperty('--delay', `${(-(i * 2.3) % 18).toFixed(1)}s`);
    p.style.setProperty('--dx', `${(i % 2 ? 1 : -1) * (40 + (i * 29) % 90)}px`);
    box.appendChild(p);
  }
}

/* ---------------- gravure en direct ---------------- */
const svg = $('#engrave'), rect = $('#revealRect'), spark = $('#spark');
const tNames = ['#tShadow', '#tGlow', '#tBody'].map((s) => $(s)), tNum = $('#tNum');
const ENG = { cx: 303, cy: 330, maxW: 300 };
let engraveTimer = 0, engraveAnim = 0;
function fitText(nodes, txt, caps) {
  const base = caps ? 44 : 66;
  nodes.forEach((t) => { t.textContent = txt; t.style.fontSize = `${base}px`; });
  let w = 0;
  try { w = nodes[nodes.length - 1].getComputedTextLength(); } catch (e) { w = 0; }
  if (w > ENG.maxW) { const f = base * ENG.maxW / w; nodes.forEach((t) => { t.style.fontSize = `${f.toFixed(1)}px`; }); w = ENG.maxW; }
  return w || 160;
}
function setText(name) {
  const caps = STATE.style === 'caps';
  svg.classList.toggle('caps', caps);
  card.classList.toggle('caps', caps);
  tNum.textContent = `${D().num} ${NUM}`;
  tNum.setAttribute('y', String(caps ? 368 : 374));
  return fitText(tNames, caps ? name.toUpperCase() : name, caps);
}
function engraveNow(instant) {
  const name = STATE.name.trim();
  cancelAnimationFrame(engraveAnim);
  const w = name ? setText(name) : 0;
  const x0 = ENG.cx - w / 2 - 14, total = w + 28;
  if (!name) { rect.setAttribute('width', '0'); spark.setAttribute('opacity', '0'); return; }
  if (instant || REDUCED) { rect.setAttribute('x', String(x0)); rect.setAttribute('width', String(total)); spark.setAttribute('opacity', '0'); return; }
  const dur = 380 + name.length * 120;
  const t0 = performance.now();
  rect.setAttribute('x', String(x0));
  const step = (now) => {
    const k = clamp((now - t0) / dur, 0, 1);
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const x = x0 + total * e;
    rect.setAttribute('width', String(total * e));
    spark.setAttribute('transform', `translate(${x.toFixed(1)} ${(ENG.cy - 16 + Math.sin(now / 38) * 7).toFixed(1)})`);
    spark.setAttribute('opacity', k < 1 ? String(0.75 + Math.random() * 0.25) : '0');
    if (k < 1) engraveAnim = requestAnimationFrame(step);
  };
  engraveAnim = requestAnimationFrame(step);
}

/* ---------------- panier ---------------- */
const cartEl = $('#cart'), panel = $('#cartPanel');
let lastFocus = null;
const cartCount = () => CART.reduce((n, l) => n + l.qty, 0);
const subTotal = () => CART.reduce((n, l) => n + SIZES[l.size].price * l.qty, 0);
const shipCost = () => (CART.length ? SHIP[STATE.ship] : 0);
const grand = () => subTotal() + shipCost();
function addToCart() {
  const item = { name: STATE.name.trim(), style: STATE.style, size: STATE.size, qty: 1 };
  const same = CART.find((l) => l.name === item.name && l.style === item.style && l.size === item.size);
  if (same) same.qty = Math.min(5, same.qty + 1); else CART.unshift(item);
  saveCart();
}
function drawShowcase() {
  const l = CART[0]; const caps = l && l.style === 'caps';
  const box = $('.cart__bottle'); box.classList.toggle('caps', !!caps);
  const n1 = $('#cName'), n2 = $('#cName2');
  const txt = l && l.name ? (caps ? l.name.toUpperCase() : l.name) : '';
  fitText([n1, n2], txt, caps);
  $('#cNum').textContent = l && l.name ? `${D().num} ${NUM}` : '';
  $('#cNum').setAttribute('y', String(caps ? 368 : 374));
}
function renderCart() {
  const d = D(), ul = $('#cartLines');
  ul.innerHTML = '';
  CART.forEach((l, i) => {
    const li = document.createElement('li'); li.className = 'line';
    const nm = l.name ? d.engraved(`<b class="${l.style === 'caps' ? 'caps' : ''}">${esc(l.style === 'caps' ? l.name.toUpperCase() : l.name)}</b>`) : d.noengrave;
    li.innerHTML = `<span class="line__t">${d.line(SIZES[l.size].ml)}</span><span class="line__p">${money(SIZES[l.size].price * l.qty)}</span>
      <span class="line__d">${nm}</span>
      <span class="line__q"><span class="qty"><button type="button" data-q="-1" data-i="${i}" aria-label="−">−</button><span>${l.qty}</span><button type="button" data-q="1" data-i="${i}" aria-label="+">+</button></span>
      <button type="button" class="line__rm" data-rm="${i}">${d.remove}</button></span>`;
    ul.appendChild(li);
  });
  const empty = !CART.length;
  $('#cartEmpty').hidden = !empty; $('#cartFull').hidden = empty; $('#cartShow').hidden = empty;
  $('#sumSub').textContent = money(subTotal());
  $('#sumShip').textContent = shipCost() ? money(shipCost()) : d['ship.free'];
  $('#sumTotal').textContent = money(grand());
  $('#expPrice').textContent = money(SHIP.exp);
  $$('.js-grand').forEach((el) => { el.textContent = money(grand()); });
  const n = cartCount(), b = $('#bagN');
  b.textContent = String(n); b.hidden = !n;
  drawShowcase();
}
function openCart(fromBuy) {
  lastFocus = document.activeElement;
  renderCart();
  cartEl.classList.add('is-on'); cartEl.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  if (fromBuy && !REDUCED) fly(); else setTimeout(() => $('#cartClose').focus(), 60);
}
function closeCart() {
  cartEl.classList.remove('is-on', 'is-landing'); cartEl.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
/* le flacon gravé s'envole du décor jusque dans le panier */
function fly() {
  const src = $('#bottleImg').getBoundingClientRect();
  const target = $('#cartBottleImg');
  cartEl.classList.add('is-landing');
  requestAnimationFrame(() => {
    const t = target.getBoundingClientRect(), pr = panel.getBoundingClientRect();
    const shift = pr.left - (innerWidth - pr.width); // le panneau arrive encore de la droite
    const tx = t.left - shift, ty = t.top;
    const node = $('#float').cloneNode(true);
    node.removeAttribute('id'); node.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    node.style.animation = 'none';
    const f = document.createElement('div'); f.className = 'flyer';
    // l'agrandissement / rétrécissement part du coin haut-gauche : sinon le flacon se pose trop bas et trop à droite
    f.style.cssText = `left:${src.left}px;top:${src.top}px;width:${src.width}px;height:${src.height}px;transform-origin:0 0`;
    f.appendChild(node); document.body.appendChild(f);
    const sx = t.width / src.width, sy = t.height / src.height;
    const dx = tx - src.left, dy = ty - src.top;
    const anim = f.animate([
      { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 140}px) scale(${(1 + sx) / 2 * 1.08}) rotate(-8deg)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy}) rotate(0deg)`, opacity: 1 },
    ], { duration: 950, easing: 'cubic-bezier(.45,.05,.2,1)', fill: 'forwards' });
    anim.onfinish = () => {
      f.remove(); cartEl.classList.remove('is-landing');
      burst(tx + t.width / 2, ty + t.height * 0.5);
      $('#cartClose').focus({ preventScroll: true });
    };
  });
}
function burst(x, y) {
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('i'); s.className = 'sparkle';
    s.style.left = `${x}px`; s.style.top = `${y}px`;
    document.body.appendChild(s);
    const a = (i / 18) * Math.PI * 2, r = 60 + (i % 5) * 22;
    s.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px)) scale(.2)`, opacity: 0 }],
      { duration: 700 + (i % 4) * 120, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => s.remove();
  }
}
function buy() {
  addToCart();
  const bag = $('#bagBtn'); bag.classList.remove('is-pop'); void bag.offsetWidth; bag.classList.add('is-pop');
  openCart(true);
}

/* ---------------- paiement (démonstration sur masquo.com) ----------------
   aucun script extérieur, aucun vrai paiement : le bouton « Payer » affiche la confirmation d'exemple. */
function setupPay() { $('#payFallback').hidden = false; }
function showDone() {
  const first = CART[0];
  $('#doneNum').textContent = NUM;
  $('#doneName').textContent = (first && first.name) || 'BRUME';
  CART = []; saveCart(); renderCart();
  closeCart();
  $('#done').classList.add('is-on'); $('#done').setAttribute('aria-hidden', 'false');
  $('#doneClose').focus();
}
let toastT = 0;
function toast(html) { const t = $('#toast'); t.innerHTML = html; t.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 4600); }

/* ---------------- pages légales, cookies, lettre ---------------- */
const legal = $('#legal');
function openLegal(key) {
  const doc = LEGAL[LANG][key]; if (!doc) return;
  $('#legalTitle').textContent = doc[0]; $('#legalBody').innerHTML = doc[1];
  if (legal.showModal) { if (!legal.open) legal.showModal(); } else legal.setAttribute('open', '');
}
function cookieInit() {
  if (!store.get('brume-cookies')) $('#cookie').hidden = false;
}

/* ---------------- langue, formulaire ---------------- */
function applyLang(l, save) {
  LANG = l;
  const d = D();
  document.documentElement.lang = l;
  document.title = d.title;
  $$('[data-t]').forEach((el) => { const v = d[el.dataset.t]; if (typeof v === 'string') el.innerHTML = v; });
  $$('[data-t-ph]').forEach((el) => { const v = d[el.dataset.tPh]; if (v) el.placeholder = v; });
  $$('[data-t-aria]').forEach((el) => { const v = d[el.dataset.tAria]; if (v) el.setAttribute('aria-label', v); });
  $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  $('#edLeft').textContent = EDITION.left.toLocaleString(l === 'fr' ? 'fr-FR' : 'en-US');
  updatePrice();
  renderCart();
  engraveNow(true);
  layout();
  if (save) store.set('brume-lang', l);
}
function updatePrice() {
  const s = SIZES[STATE.size];
  $('#price').textContent = money(s.price);
  $('#ppl').textContent = D().ppl(money(Math.round(s.price / s.ml * 1000)));
  $$('.js-total').forEach((el) => { el.textContent = money(s.price); });
  $('#stickyName').textContent = STATE.name.trim() || '—';
}
function bindForm() {
  const input = $('#name');
  input.addEventListener('input', () => {
    const clean = input.value.replace(/[^\p{L}\s'’-]/gu, '').slice(0, 12);
    if (clean !== input.value) input.value = clean;
    STATE.name = clean;
    updatePrice();
    clearTimeout(engraveTimer);
    engraveTimer = setTimeout(() => engraveNow(false), 350);
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') buy(); });
  $$('#styles button').forEach((b) => b.addEventListener('click', () => {
    STATE.style = b.dataset.style;
    $$('#styles button').forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    engraveNow(false);
  }));
  $$('#sizes button').forEach((b) => b.addEventListener('click', () => {
    STATE.size = +b.dataset.size;
    $$('#sizes button').forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    updatePrice();
  }));
  $$('.lang button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang, true)));
  $('#buy').addEventListener('click', buy);
  $('#stickyBuy').addEventListener('click', buy);
  $('#bagBtn').addEventListener('click', () => openCart(false));
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartVeil').addEventListener('click', closeCart);
  $('#cartBack').addEventListener('click', () => { closeCart(); $('#name').focus(); });
  $('#cartLines').addEventListener('click', (e) => {
    const q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
    if (q) { const l = CART[+q.dataset.i]; l.qty = clamp(l.qty + +q.dataset.q, 0, 5); if (!l.qty) CART.splice(+q.dataset.i, 1); }
    else if (rm) CART.splice(+rm.dataset.rm, 1);
    else return;
    saveCart(); renderCart();
  });
  $$('input[name="ship"]').forEach((r) => r.addEventListener('change', () => { STATE.ship = r.value; renderCart(); }));
  $('#payFallback').addEventListener('click', showDone);
  $('#applePay').addEventListener('click', showDone); // une vraie boutique ouvrirait ici la feuille Apple Pay
  $('#payCard').addEventListener('click', () => toast(D()['pay.cardtoast']));
  $('#doneClose').addEventListener('click', () => { $('#done').classList.remove('is-on'); $('#done').setAttribute('aria-hidden', 'true'); });
  // pages légales (liens du pied de page, du panier, des cookies, de la lettre)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-legal]');
    if (a) { e.preventDefault(); openLegal(a.dataset.legal); return; }
    if (e.target.closest('[data-ck-reset]')) { e.preventDefault(); store.set('brume-cookies', ''); legal.close && legal.close(); $('#cookie').hidden = false; }
  });
  $('#legalClose').addEventListener('click', () => legal.close ? legal.close() : legal.removeAttribute('open'));
  legal.addEventListener('click', (e) => { if (e.target === legal) legal.close(); });
  $$('[data-ck]').forEach((b) => b.addEventListener('click', () => { store.set('brume-cookies', b.dataset.ck); $('#cookie').hidden = true; }));
  $('#newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = $('#newsMail').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { toast(D()['nl.bad']); $('#newsMail').focus(); return; }
    $('#newsMail').value = ''; toast(D()['nl.ok']);
  });
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if ($('#done').classList.contains('is-on')) $('#doneClose').click();
    else if (cartEl.classList.contains('is-on')) closeCart();
  });
  // le focus reste dans le panier ouvert
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = $$('button, [href], input, textarea, select, iframe', panel).filter((x) => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
}

/* ---------------- menu en verre au défilement, barre d'achat sur téléphone ---------------- */
function watch() {
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-solid', scrollY > view.offsetHeight - 80);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  new IntersectionObserver(([e]) => $('#sticky').classList.toggle('is-on', !e.isIntersecting && scrollY > 200)).observe($('#buy'));
  new IntersectionObserver(([e]) => view.classList.toggle('is-paused', !e.isIntersecting)).observe(view);
}

/* ---------------- départ ---------------- */
async function start() {
  makeGlints();
  makePetals();
  bindForm();
  applyLang(LANG, false);
  layout();
  addEventListener('resize', layout);
  bindPointer();
  watch();
  cookieInit();
  try { await Promise.all([document.fonts.load('66px "Pinyon Script"'), document.fonts.load('600 44px "Cormorant Garamond"')]); } catch (e) { /* polices facultatives */ }
  renderCart();
  setTimeout(() => engraveNow(false), 700); // le prénom d'exemple se grave peu après l'ouverture
  setupPay();
}
start();
})();
