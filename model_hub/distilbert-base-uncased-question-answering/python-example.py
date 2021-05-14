import npu

npu.api('API_TOKEN', deployed=True)

model_id = '609d575b0421e5d2d70533e2'

context = """ Nikola Tesla was born an ethnic Serb in the village of Smiljan, within the Military Frontier, in the Austrian Empire (present day Croatia), on 10 July [O.S. 28 June] 1856.[13][14] His father, Milutin Tesla (1819–1879),[15] was an Eastern Orthodox priest.[16][17][18][19] Tesla's mother, Đuka Mandić (1822–1892), whose father was also an Orthodox priest,[20] had a talent for making home craft tools and mechanical appliances and the ability to memorize Serbian epic poems. Đuka had never received a formal education. Tesla credited his eidetic memory and creative abilities to his mother's genetics and influence.[21][22] Tesla's progenitors were from western Serbia, near Montenegro.[23]
Tesla was the fourth of five children. He had three sisters, Milka, Angelina and Marica, and an older brother named Dane, who was killed in a horse riding accident when Tesla was aged five.[24] In 1861, Tesla attended primary school in Smiljan where he studied German, arithmetic, and religion.[25] In 1862, the Tesla family moved to the nearby Gospić, where Tesla's father worked as parish priest. Nikola completed primary school, followed by middle school.[25] In 1870, Tesla moved to Karlovac[26] to attend high school at the Higher Real Gymnasium where the classes were held in German, as it was usual throughout schools within the Austro-Hungarian Military Frontier.[27]
Tesla's father, Milutin, was an Orthodox priest in the village of Smiljan. Tesla later wrote that he became interested in demonstrations of electricity by his physics professor.[28] Tesla noted that these demonstrations of this "mysterious phenomena" made him want "to know more of this wonderful force".[29] Tesla was able to perform integral calculus in his head, which prompted his teachers to believe that he was cheating.[30] He finished a four-year term in three years, graduating in 1873.[31]In 1873, Tesla returned to Smiljan. Shortly after he arrived, he contracted cholera, was bedridden for nine months and was near death multiple times. Tesla's father, in a moment of despair, (who had originally wanted him to enter the priesthood)[32] promised to send him to the best engineering school if he recovered from the illness.
"""
questions = [
    "Where was Nikola Tesla raised?",
    "What were the name of his sisters?",
    "What religion was the priest?",
    "What was the major event that happened to Nikola?"
]

data = [context]

kwargs = {
    'questions': questions
}

output = npu.predict(model_id, data, kwargs)
print(output)