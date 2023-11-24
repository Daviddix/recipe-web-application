import leftArrowIcon from "../../assets/icons/arrow-left.svg"
import timeIcon from "../../assets/icons/time.svg"
import fireIcon from "../../assets/icons/fire.svg"
import foodBasket from "../../assets/icons/vegetable-basket.svg"
import "./SingleRecipe.css"

function SingleRecipe() {
  return (
    <>
    <header className="recipe-header">
        <button className="back-button">
            <img src={leftArrowIcon} alt="go back" />
        </button>
    </header>

    <main className="recipe-info-main">
        <h1>Spiced Chicken Pricata</h1>
        <p>By James DE</p>

        <div className="recipe-info-container">
        <div className="time">
                    <img src={timeIcon} alt="time icon" />
                    <p>40mins</p>
                </div>

                <div className="calories">
                <img src={fireIcon} alt="fire icon" />
                    <p>40 Calories</p>
                </div>

                <div className="ingredients">
                <img src={foodBasket} alt="food basket icon" />
                    <p>12 Ingredients</p>
                </div>
        </div>

        <div className="ingredients-container">
            <h2>Ingredients</h2>
            <ul>
                <li>Chicken</li>
                <li>Pepper</li>
                <li>Spring Onions</li>
                <li>Spring Onions</li>
                <li>Spring Onions</li>
                <li>Spring Onions</li>
            </ul>
        </div>

        <div className="process">
        <h2>Process</h2>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias natus ipsum molestias quia sequi quasi autem provident. Natus error expedita accusamus sit quo totam voluptatibus ea molestiae ad quam. Quis dolor perspiciatis reiciendis distinctio, nobis cupiditate in tenetur dignissimos similique ut iusto quo quos nesciunt nihil earum veritatis. Nostrum accusamus reprehenderit sequi eos? Facere architecto hic, enim dolorem corporis incidunt, ullam blanditiis eaque illo nihil eligendi quia omnis mollitia et magni veritatis consectetur quod ab non similique. Maiores, eligendi ea illo aut voluptas natus eos minus earum quaerat architecto dolorum, cumque rem deleniti blanditiis harum laudantium. Ratione atque ipsam tenetur.

<br />
<br />
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptate repellendus, provident deleniti similique illo pariatur qui officia iste iure laborum explicabo quis consequatur quo, dolorum laudantium aliquid natus dolor odio. Rem at deleniti impedit exercitationem magni ratione ullam. Eveniet, maxime omnis aliquam minus incidunt nobis voluptatum enim eius harum. Dignissimos iste, labore itaque quia, fuga autem qui velit perferendis possimus maiores quaerat eaque debitis error sapiente quidem architecto non at, repellat minus deleniti deserunt aliquam provident dolore? Ad excepturi veritatis magni optio maxime necessitatibus minima doloremque est odio molestias dignissimos aut architecto quaerat iure quidem error quam sunt odit distinctio, voluptatibus iste cum! Ab autem tempore debitis odit rerum nemo sit vero, architecto inventore. Numquam quibusdam, placeat maxime quod fuga explicabo ea dolorem necessitatibus aut. Sed sapiente tenetur illo corrupti mollitia neque atque, eveniet voluptate dicta suscipit aut molestiae sit nostrum consequatur sint, commodi laboriosam. Doloremque accusantium ipsum praesentium nesciunt dolores possimus commodi ab ex consequuntur libero, quam ducimus non voluptate nam repudiandae at corrupti illo reprehenderit deserunt error exercitationem! Voluptatem sit praesentium ad aperiam vero voluptas necessitatibus tempore iste assumenda dolorum corporis nesciunt quidem earum soluta pariatur unde qui maxime, corrupti animi iure doloremque. Nihil cum obcaecati nulla non impedit voluptatem quidem odio voluptatibus tempore culpa consequuntur modi dolores, aut doloribus deserunt mollitia, tenetur laudantium nisi perspiciatis. Error dolores consequuntur minima itaque et voluptates deserunt architecto eveniet. Necessitatibus, aliquid et? Perspiciatis, sit magni illo, natus, possimus nam laboriosam recusandae dolorum sequi iste vero deleniti unde. Possimus suscipit sapiente inventore quibusdam explicabo id odio obcaecati dolor labore quidem? Nam explicabo vel, dolore sed ipsa corrupti alias exercitationem soluta eveniet facere. Labore, minima nobis! Consequatur labore dolores, iusto debitis ad error, laboriosam sint similique inventore ea enim mollitia aliquid autem qui nemo veniam nam harum aperiam accusantium, placeat sunt voluptates tempora eius possimus? Suscipit doloremque aliquam repellat cumque sint quo similique veritatis architecto officia voluptas, aspernatur facere neque eligendi? Possimus nemo, tenetur hic porro, sit aliquid expedita, dignissimos fugit incidunt eveniet earum? Sint iure suscipit dignissimos corrupti sit iste perspiciatis ex officia odit molestias recusandae fugiat illum non, eius nisi eligendi? Vel hic nostrum quod recusandae perferendis voluptate deleniti iusto animi culpa dolorum? Illum pariatur cupiditate dicta. Quaerat vitae quis dolorem eligendi ut tenetur corporis voluptatibus adipisci, qui expedita hic id explicabo soluta in illo recusandae corrupti nesciunt et harum doloremque beatae est earum praesentium. Ea quis quo a quasi!

            </p>
        </div>
    </main>
    </>
  )
}

export default SingleRecipe